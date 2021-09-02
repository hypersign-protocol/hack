import { Router } from "express";
import SubsController from "../controllers/subscription";

export = (hypersign) => {
  const router = Router();
  router.post("/", hypersign.authorize.bind(hypersign), SubsController.addSubscription);
  router.get("/", hypersign.authorize.bind(hypersign), SubsController.getSubscriptionByDid);
  return router;
};
