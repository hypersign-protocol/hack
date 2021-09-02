import SubscriptionService from "./subscription.service";
import PlanService from "./plan.service";
import { ISubscription } from "../models/subscription";
import { IPlan } from "../models/plan";
import env from "dotenv";

env.config();
const subService = new SubscriptionService();
const planService =  new PlanService();

async function activate(){
    console.log("*******************************************")
    console.log("**** Activating subscription start ********")
    console.log(" ")
    console.log(" ")
    console.log(" ")
    
    const subscriptionId = process.env.SUBSCRIPTIONID;
    if(!subscriptionId) throw new Error("Please pass SUBSCRIPTIONID as env var");

    console.log("     Fetching subscription for id = " + subscriptionId);
    const subInDb: ISubscription = await subService.getById({ id: subscriptionId});
    if(!subInDb)  throw new Error("No subscription found with id = " + subscriptionId);
    
    const { planId,  userDid } =  subInDb;

    console.log("     Fetching plan with id " + planId);
    const plan: IPlan =  await planService.getById({id: planId});
    if(!plan)  throw new Error("No plan found with id = " + planId);

    const filter = { _id: subscriptionId, userDid }     
    const update = {
        leftOverNoRequests: plan.totalNoOfRequests,
        isActive: true // activate it
    };
    
    console.log("     Updating subscriptions and usage tables");
    await subService.updateSubscription(filter, update);

    const updatedSubs = await subService.getById({ id: subscriptionId });
    const updatedUsage = await subService.usage({ did: userDid}) ;

    console.log("         Usage : " + JSON.stringify(updatedUsage))
    console.log("         Subscription : " + JSON.stringify(updatedSubs))
        
    console.log(" ")
    console.log(" ")
    console.log(" ")
    console.log("**** Activating subscription finished *****")
    console.log("*******************************************")
}   

activate();


