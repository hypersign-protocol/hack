import { Router } from "express";
import ProjectController from "../controllers/project";

import {
  ProjectSchemaBody,
  ProjectSchemaPrams,
} from "../middleware/projectSchema";

import { validateRequestSchema } from "../middleware/validateRequestSchema";

import {
  verifySubscriptionWithDid
} from "../middleware/subscription";

export = (hypersign) => {
  const router = Router();

  router.post(
    "/",
    hypersign.authorize.bind(hypersign),
    verifySubscriptionWithDid, 
    ProjectSchemaBody,
    validateRequestSchema,
    ProjectController.addProject
  );

  router.put(
    "/",
    hypersign.authorize.bind(hypersign),
    ProjectSchemaBody,
    validateRequestSchema,
    ProjectController.updateProject
  );

  router.get(
    "/",
    hypersign.authorize.bind(hypersign),
    ProjectController.getAllProject
  );

  router.get(
    "/:id",
    (req, res, next) => {
      const { isPublic } = req.query;
      if (isPublic) {
        next();
      } else {
        hypersign.authorize(req, res, next);
      }
    },
    ProjectSchemaPrams,
    validateRequestSchema,
    ProjectController.getProjectById
  );

  router.get(
    "/:id/lottery",
    hypersign.authorize.bind(hypersign),
    ProjectSchemaPrams,
    validateRequestSchema,
    ProjectController.getRandomInvestors
  );
  


  // Delete
  router.delete(
    "/:id",
    hypersign.authorize.bind(hypersign),
    ProjectSchemaPrams,
    validateRequestSchema,
    ProjectController.deleteProjectById
  );

  return router;
};
