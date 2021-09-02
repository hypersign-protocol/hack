import { body, param } from "express-validator";
import { validateURL } from "../utils/fields";

export const TweeterSchemaPrams = [
    param("userId")
      .exists({ checkFalsy: true })
      .trim()
      .withMessage("userId can not be null or empty"),
  ];
  
  export const TweeterSchemaBody = [
  
    // verify this as well
    body("tweetText")
      .exists({ checkFalsy: true })
      .trim()
      .withMessage("tweetText can not be null or empty"),
  
    body("userId")
      .exists({ checkFalsy: true })
      .trim()
      .withMessage("userId can not be null or empty"),
    
    body("tweetUrl")
      .exists({ checkFalsy: true })
      .trim()
      .custom((value) => validateURL(value))
      .withMessage("invalid tweet url"),
  ];

  export const TweeterFollowerBody = [
    body("sourceScreenName")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("sourceScreenName can not be null or empty"),

   body("targetScreenName")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("targetScreenName can not be null or empty"),
  ]
  