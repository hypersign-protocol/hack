import PlanService from "./plan.service";
import planJson from "./plans.json";
import env from "dotenv";

env.config();
const planService =  new PlanService();

async function bootstrapPlans(){
    console.log("*******************************************")
    console.log("**** Bootstraping plans start ********")
    console.log(" ")
    console.log(" ")
    console.log(" ")
    
    if(planJson){
        if(planJson.length > 0){
            planJson.forEach(plan => {
                planService.add({...plan});
            })
        }
    }else{
        throw new Error("No plan found");
    }
        
    console.log(" ")
    console.log(" ")
    console.log(" ")
    console.log("**** Bootstraping plans finished *****")
    console.log("*******************************************")
}   

bootstrapPlans();


