import { Router } from "express";
import PlanController from "../controllers/plan";

export = () => {
  const router = Router();
  router.post("/", PlanController.addPlan);
  router.get("/", PlanController.getAllPlans);
  return router;
};
