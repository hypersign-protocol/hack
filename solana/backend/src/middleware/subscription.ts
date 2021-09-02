import SubscriptionService from "../services/subscription.service";
import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import ProjectModel, { IProject } from "../models/project";

const subscriptionService = new SubscriptionService();

async function verifySubscription(req: Request, res: Response, next: NextFunction){    
    try{
        // console.log("call comes in verifySubscription middleware");
        // get the prpjectId from request
        const {  projectId  } = req.body;
    
        // find the owner of the project
        const project: IProject = await ProjectModel.findById({ _id: projectId });
        const { ownerDid } = project;
        
        const res = await subscriptionService.verify({did: ownerDid});
        if(!res){
            // if not send the error response back  to user
            return next(ApiError.badRequest("Subscription failed. Please contract the admin"));
        }
        // if yes then move to controller where user can filled the form
        req.body["ownerDid"] = ownerDid;
        next();
    }catch(e){
        next(ApiError.internal(e.message));
    }
}

async function verifySubscriptionWithDid(req: Request, res: Response, next: NextFunction){    
    try{
        // console.log("call comes in verifySubscription middleware");
        // get the prpjectId from request
        const {  userData  } = req.body;
        
        const res = await subscriptionService.verify({did: userData.id});
        if(!res){
            // if not send the error response back  to user
            return next(ApiError.badRequest("Subscription failed. Please contract the admin"));
        }
        // if yes then move to controller where user can filled the form
        next();
    }catch(e){
        next(ApiError.internal(e.message));
    }
}

async function updateSubscription(req: Request, res: Response, next: NextFunction){
    try{
        // console.log("call comes in updateSubscription middleware");
        // if user has successfully filled the form then
        const { result,  ownerDid } = req.body;
        // updated the usage table for that admin
        subscriptionService.upInsertUsage({userDid: ownerDid, totalAvailable: 0,  totalUsed: 0, updateUsed: true})
        
        res.send(result);
        // send the success response back to the user
    }catch(e){
        next(ApiError.internal(e.message));
    }
}

export {
    verifySubscription,
    verifySubscriptionWithDid,
    updateSubscription
}