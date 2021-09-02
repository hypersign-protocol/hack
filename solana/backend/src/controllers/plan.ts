import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import { logger } from "../config";
import PlanService from "../services/plan.service";

const planService = new PlanService();

async function addPlan(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info("PlanController:: addPlan() method start..");
    const { planName, description, totalNoOfRequests, price } = req.body;

    const newPlan = await planService.add({
      planName,
      description, 
      totalNoOfRequests,
      price,
    });

    logger.info(
      "PlanController:: addPlan(): before creating a new plan into db"
    );
    res.send(newPlan);
  } catch (e) {
    logger.error("PlanController:: addPlan(): Error " + e);
    next(ApiError.internal(e.message));
  } finally {
    logger.info("PlanController:: addPlan method ends.");
  }
}

async function getAllPlans(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info("PlanController:: getAllPlans method start..");
    const employeeList = await planService.list();
    res.send(employeeList);
  } catch (e) {
    logger.error("PlanController:: getAllPlans(): Error " + e);
    next(ApiError.internal(e.message));
  } finally {
    logger.info("PlanController:: getAllPlans method ends.");
  }
}

export default {
  addPlan,
  getAllPlans,
};
