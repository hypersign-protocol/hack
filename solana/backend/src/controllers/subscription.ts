import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import { logger } from "../config";
import SubscriptionService from "../services/subscription.service";
import PlanService from "../services/plan.service";
import { IPlan } from "../models/plan";

const planService = new PlanService();
const subscriptionService = new SubscriptionService();

async function addSubscription(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info("SubscriptionController:: addSubscription() method start..");
    const { planId, userData } = req.body; //need to remove userDid as well... it will come from hypersign auth

    const planFromDb:IPlan =  await planService.getById({id: planId});
    if(!planFromDb){
      return next(ApiError.badRequest("invalid plan id")); 
    }

    logger.info(
      "SubscriptionController:: addSubscription(): before creating a new subscrption into db"
      );
    
    const newSub = await subscriptionService.add({planId, userDid: userData.id, 
      subscriptionDate: new Date().toISOString(), 
      isActive: false, 
      hasExpired: false, 
      leftOverNoRequests: planFromDb.totalNoOfRequests
    });

    res.send(newSub);
  } catch (e) {
    logger.error("SubscriptionController:: addSubscription(): Error " + e);
    next(ApiError.internal(e.message));
  } finally {
    logger.info("SubscriptionController:: addSubscription method ends.");
  }
}

async function getSubscriptionByDid(req: Request, res: Response, next: NextFunction) {
  try {    
    logger.info("SubscriptionController:: getSubscriptionByDid method start..");
    const { userData } = req.body; // need to use from hypersign auth ... ///this is only for testing 
    const { usage } = req.query;
    const filter = { userDid: userData["id"] };
    const employeeList = await subscriptionService.list(filter);
    let resp = {};
    resp["subscriptions"] = employeeList;
    if(usage){
      resp["usage"] = await subscriptionService.usage({ did: userData["id"] });
    }
    res.send(resp);
  } catch (e) {
    logger.error("SubscriptionController:: getSubscriptionByDid(): Error " + e);
    next(ApiError.internal(e.message));
  } finally {
    logger.info("SubscriptionController:: getSubscriptionByDid method ends.");
  }
}

export default {
  addSubscription,
  getSubscriptionByDid,
};
