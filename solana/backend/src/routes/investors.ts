import { Router } from "express";
import InvestorController from "../controllers/investor";

export = (hypersign) => {

  const router = Router();

  router.post("/issue",  hypersign.authorize.bind(hypersign), InvestorController.issueCredential);

  // Since this will be called by mobile wallet, you need hypersign authorization middleware here...
  router.get("/credential",  InvestorController.getCredential);
  
 return router;  

}


