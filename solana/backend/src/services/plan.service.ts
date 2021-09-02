import PlanModel, { IPlan } from "../models/plan";
import { logger } from "../config";

export default class Plan{
    constructor(){
        
    }

    add({ planName, description, totalNoOfRequests, price }): Promise<IPlan>{
        return new Promise(async (resolve, reject) => {
            try{
                const newPlan: IPlan = await PlanModel.create({ planName, description, totalNoOfRequests, price });
                resolve(newPlan);
            }catch(e){
                logger.error("PlanService:: add(): e = " + e);
                reject(e)
            }
        })
    }

    list(): Promise<Array<IPlan>>{
        return new Promise(async (resolve, reject) => {
            try{
                const allPlans: Array<IPlan> = await PlanModel.find({});
                resolve(allPlans);
            }catch(e){
                logger.error("PlanService:: list(): e = " + e);
                reject(e)
            }
           
        })
    }

    getById({id}): Promise<IPlan>{
        return new Promise(async(resolve, reject)=> {
            try{
                const plan: IPlan = await PlanModel.findById({ _id: id})
                resolve(plan);
            }catch(e){
                logger.error("PlanService:: getById(): e = " + e);
                reject(e);
            }
        })
    }
}
