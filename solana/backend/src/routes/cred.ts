import { Router } from "express";
import { logger } from "../config";
import ApiError from '../error/apiError';
import CredService from "../services/cred.service";
import InvestorController from "../controllers/credUser";


export = (hypersign) => {
  const router = Router();
  const credService =  new CredService();

  router.post(
    "/generateOTP",
    // hypersign.authorize.bind(hypersign),
    async (req, res, next) => {
      try{
        logger.info("Inside cred verify");
        const { phoneNumber } =  req.body;
        
        if(!phoneNumber){
          return next(ApiError.badRequest("phoneNumber can not be null or empty"));
        }

        logger.info("Before calling tService.validateTweetUrl")
        const resp: any = await credService.generateOTP({ phoneNumber });
        logger.info("After calling tService.validateTweetUrl " + JSON.stringify(resp))
        res.send(resp);
      }catch(e){
        logger.error("InvestorController:: addInvestor(): Error " + e);
        next(ApiError.internal(e));
      }
    }
  );

  router.post(
    "/verifyOTP",
    // hypersign.authorize.bind(hypersign),
    async (req, res, next) => {
      try{
        logger.info("Inside cred verify");
        const { otp, token } =  req.body;
        
        if(!otp){
          return next(ApiError.badRequest("otp can not be null or empty"));
        }

        if(!token){
          return next(ApiError.badRequest("token can not be null or empty"));
        }

        logger.info("Before calling tService.validateTweetUrl")
        const resp: any = await credService.verifyOTP({ otp, token });
        logger.info("After calling tService.validateTweetUrl " + JSON.stringify(resp))
        res.send(resp);
      }catch(e){
        logger.error("InvestorController:: addInvestor(): Error " + e);
        next(ApiError.internal(e));
      }
    }
  );

  router.post("/issue",  hypersign.authorize.bind(hypersign), InvestorController.issueCredential);

  // Since this will be called by mobile wallet, you need hypersign authorization middleware here...
  router.get("/credential",  InvestorController.getCredential);


  return router;
};

