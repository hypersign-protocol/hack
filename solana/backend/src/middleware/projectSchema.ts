import { body, param, query } from "express-validator";
import { validateURL, validateDate, notLessThanCurrent } from "../utils/fields";

export const ProjectSchemaPrams = [
  param("id")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("id can not be null or empty"),
];

export const ProjectSchemaBody = [
  body("projectName")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("projectName is null or empty"),
  body("logoUrl")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("logoUrl is invalid or empty"),

  body("fromDate")
    .exists({ checkFalsy: true })
    .trim()
    .custom((value) => validateDate(value))
    .withMessage("fromDate is invalid or empty"),

  // body("fromDate")
  //   .custom((value) => notLessThanCurrent(value))
  //   .withMessage("start date time can not be less than current time"),

  body("toDate")
    .exists({ checkFalsy: true })
    .trim()
    .custom((value) => validateDate(value))
    .withMessage("toDate is invlaid or empty"),

  // body("toDate")
  //   .custom((value) => notLessThanCurrent(value))
  //   .withMessage("end date time can not be less than current time"),


  // body("twitterHandle")
  //   .exists({ checkFalsy: true })
  //   .trim()
  //   .withMessage("twitterHandle is null or empty"),

  // body("telegramHandle")
  //   .exists({ checkFalsy: true })
  //   .trim()
  //   .withMessage("telegramHandle is null or empty"),

  // body("twitterPostFormat")
  //   .exists({ checkFalsy: true })
  //   .trim()
  //   .withMessage("twitterPostFormat is null or empty"),

  body("projectStatus")
    .exists()
    .isBoolean()
    .withMessage("projectStatus must be be boolean"),
];
