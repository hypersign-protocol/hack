import { body, param, query } from "express-validator";
import Web3 from "web3";
import { validateURL } from "../utils/fields";

function validateEthAddress(address) {
  return new Promise((resolve, reject) => {
    try {
      const addr = Web3.utils.toChecksumAddress(address);
      resolve(true);
    } catch (error) {
      reject("invalid eth address");
    }
  });
}

export const InvestorSchemaQuery = [
  query("projectId")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("projectId can not be null or empty"),
];

export const InvestorSchemaPrams = [
  param("did")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("did can not be null or empty"),
];

export const InvestorSchemaBody = [
  body("email").isEmail().withMessage("email must be a valid email address"),

  // verify this as well
  body("did")
    .exists({ checkFalsy: true })
    .withMessage("did can not be null or empty"),

  body("name")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("name can not be null or empty"),

  body("ethAddress")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("invalid ethereum address"),

  body("twitterHandle")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("invalid twitterHandle"),

  body("telegramHandle")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("invalid telegramHandle"),

  body("hasTwitted")
    .exists({ checkFalsy: true })
    .toBoolean()
    .withMessage("hasTwitted must be a boolean"),
  body("hasJoinedTGgroup")
    .exists({ checkFalsy: true })
    .toBoolean()
    .withMessage("hasJoinedTGgroup must be a boolean"),

  body("projectId")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("projectId can not be null or empty"),

  body("tweetUrl")
    .exists({ checkFalsy: true })
    .trim()
    .custom((value) => validateURL(value))
    .withMessage("invalid tweet url"),
];
