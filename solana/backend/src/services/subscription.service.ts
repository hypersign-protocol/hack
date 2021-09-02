import SubscriptionModel, { ISubscription } from "../models/subscription";
import { IPlan } from "../models/plan";
import UsageModel, { IUsage } from "../models/usage";
import PlanService from "./plan.service";
// import planList from "./plans.json";

export default class Subscription{
    plan;
    constructor(){
        this.plan = new PlanService();
    }

    async upInsertUsage({ userDid, totalAvailable, totalUsed = 0, updateUsed = false }){
        const filter = { userDid };
        const usageInDb:IUsage = await UsageModel.where(filter).findOne();
        if(!usageInDb){
            // insert
            UsageModel.create({
                userDid, totalAvailable, totalUsed
            })
        }else{
            // update
            let update; 
            if(!updateUsed){
                update = { $set: { totalAvailable: usageInDb.totalAvailable + totalAvailable }};
            }else{
                update = { $set: { totalUsed: usageInDb.totalUsed + 1 }};
            }
            
            await UsageModel.updateOne(filter,  update);
        }
    }
    
    add({planId, userDid, subscriptionDate, isActive, hasExpired, leftOverNoRequests}): Promise<ISubscription>{
        return new Promise(async (resolve, reject) => {
            try{
                const planInDb: IPlan = await this.plan.getById({id: planId});


                // we only allow 1 freemium subscription
                if(planInDb.planName === "Freemium"){
                    const subscriptionWithFreemiumPlans: Array<ISubscription> = await this.list({ userDid, planId });
                    if(subscriptionWithFreemiumPlans && subscriptionWithFreemiumPlans.length >= 1){
                        throw new Error("You can not opt for more than one freemium plan");
                    }
                }

                let newSubscription: ISubscription = await SubscriptionModel.create({
                    planId, userDid, subscriptionDate, isActive, hasExpired, leftOverNoRequests          
                });
                
                // in case of freemium, activate the subscription right away
                if(planInDb.planName === "Freemium"){                    
                    // updated usage and subscriptioin 
                    const filter = {
                        _id: newSubscription["_id"],
                        userDid
                    };
                    const update = {
                        leftOverNoRequests,
                        isActive: true // activate it
                    };
                    newSubscription = await this.updateSubscription(filter, update);
                }
                
                resolve(newSubscription);
            }catch(e){
                reject(e)
            }
        })
    }

    updateSubscription(filter, update): Promise<ISubscription>{
        return new Promise(async (resolve, reject) => {
            try{
                const subcrip: ISubscription = await SubscriptionModel.findByIdAndUpdate(filter["_id"], update);
                this.upInsertUsage({ userDid: filter["userDid"], totalAvailable: update["leftOverNoRequests"]});
                resolve(subcrip);
            }catch(e){
                reject(e)
            }
        }) 
    }

    list(filter): Promise<Array<ISubscription>>{
        return new Promise(async (resolve, reject) => {
            try{
                const allSubscriptionForUser: Array<ISubscription> = await SubscriptionModel.where(filter).find();
                resolve(allSubscriptionForUser);
            }catch(e){
                reject(e)
            }
        })
    }

    getById({id}): Promise<ISubscription>{
        return new Promise(async(resolve, reject)=> {
            try{
                const plan: ISubscription = await SubscriptionModel.findById({ _id: id})
                resolve(plan);
            }catch(e){
                reject(e);
            }
        })
    }

    usage({did}): Promise<IUsage>{
        return new Promise(async (resolve, reject) => {
            try{
                const usage: IUsage = await UsageModel.where({userDid: did}).findOne();
                resolve(usage);
            }catch(e){
                reject(e)
            }
        })
    }

    verify({did}): Promise<boolean>{
        return new Promise(async (resolve, reject) => {
            if(!did) reject("Invalid did")

            try{
                // check if 
                // owner has active subscriptions or not
                const subscriptionList: Array<ISubscription> = await this.list({userDid: did, isActive: true});
                if(!subscriptionList){
                    throw new Error("Could not fetch subscription for admin did " + did)
                }
                if(subscriptionList.length === 0){
                    return resolve(false);
                }

                // has some requests left or not
                const usage:IUsage = await this.usage({did});
                if(!usage) {
                    throw new Error("Could not fetch usage for admin did " + did);
                }
    
                if(usage.totalUsed >= usage.totalAvailable){
                    return resolve(false);
                }

                resolve(true);
            }catch(e){
                reject(e)
            }
        })
    }
}
