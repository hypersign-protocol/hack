import env from "dotenv";
import path from "path";
import fs from "fs";
import HypersignSsiSDK from "hs-ssi-sdk";
import mongoose from "mongoose";
const log = require("simple-node-logger");

env.config();

const log_dir = path.resolve(__dirname, "../log");

if (!fs.existsSync(log_dir)) fs.mkdirSync(log_dir);

// LOGGING
const log_path = path.resolve(
  __dirname,
  process.env.LOG_FILEPATH || "whitelist-backend.log"
);
const logger = log.createSimpleLogger({
  logFilePath: log_path,
  timestampFormat:
    process.env.LOG_TIMESTAMP_FORMAT || "YYYY-MM-DD HH:mm:ss.SSS",
});
logger.setLevel(process.env.LOG_LEVEL || "info");

const port = process.env.PORT || 6006;
const host = process.env.HOST || "172.20.10.8";
const httpsEnabled = process.env.ENABLE_HTTPS || true;
const protocol = httpsEnabled ? "https" : "http";
const hostnameurl = process.env.SERVICE_EP_URL ||  `${protocol}://${host}:${port}`;


//DATABASE
const dbConnUrl =
  process.env.DB_URL && process.env.DB_URL != ""
    ? process.env.DB_URL
    : "mongodb://admin:admin@cluster0-shard-00-00.jg0ef.mongodb.net:27017,cluster0-shard-00-01.jg0ef.mongodb.net:27017,cluster0-shard-00-02.jg0ef.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-n72avn-shard-0&authSource=admin&retryWrites=true&w=majority";
if (dbConnUrl) {
  mongoose.connect(
    dbConnUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        logger.error("Error: could not connect to mongo database");
      } else {
        logger.info("Connected to mongo database");
      }
    }
  );
}

// DID Related:
// TODO: Not required for this project. so remove
const did = {
  sheme: process.env.DID_SCHEME || "did",
  method: process.env.DID_METHOD_NAME || "hypersign",
};

const jwtSecret = process.env.JWT_SECRET || "secretKey";
const jwtExpiryInMilli = 240000;

const nodeServer = {
  baseURl: process.env.NODE_SERVER_BASE_URL || "https://ssi.hypermine.in/core/",
  schemaGetEp: process.env.NODE_SERVER_SCHEMA_GET_EP || "api/v1/schema/",
};

const hypersignSDK = new HypersignSsiSDK(
  { nodeUrl: nodeServer.baseURl } // Hypersign node url
);

const whitelistingSchemaId =
  process.env.WHITELISTING_SCHEMAID ||
  "sch_3e2bb460-3028-4c64-accc-c680ce7744ed";

const recaptchaSecret = process.env.RECAPTCHA_SECRET;
const recaptchaUri = "https://www.google.com/recaptcha/api/siteverify";


const hsAuthServerEp = process.env.HS_AUTH_SERVER_URL || "https://ssi.hypermine.in/hsauth/";


const whitelist = process.env.WHITELISTED_CORS || ['*'];

const tweeterConfig = {
  consumer_key: process.env.TWEETER_CONSUMER_KEY || "q1hSjffihVvO025rGNT8PNch5",
  consumer_secret: process.env.TWEETER_CONSUMER_SECRET || "1L8OAB9J4FXPtF2TvAYr7AMJG6ioLFB0gCfK3szgR9p7VPbn3B",
  access_token: process.env.TWEETER_ACCESS_TOKEN || "910185786330423296-w15MIwdFQoHjAHPzriQsiolUWyvbsUL",
  access_token_secret: process.env.TWEETER_ACCESS_TOKEN_SECRET || "uuMl1yj4KIu1OeF7SHwoseLRahwa9ycXTunx7GOXlLw8f"
}

const REFFERAL_MULTIPLIER = 10;
const CRED_PARTNER_SECRET_KEY = process.env.CRED_PARTNER_SECRET_KEY ||  "06ea0b58b75eee270a7e9b42501d8ba2";
const credSchemaId = process.env.HS_CRED_SCHEMA_ID || "sch_2ff9af08-0e72-43a0-aa27-b82b65661890"
export {
  port,
  host,
  logger,
  did,
  jwtSecret,
  jwtExpiryInMilli,
  nodeServer,
  hypersignSDK,
  hostnameurl,
  whitelistingSchemaId,
  recaptchaSecret,
  recaptchaUri,
  httpsEnabled,
  whitelist,
  hsAuthServerEp,
  tweeterConfig,
  REFFERAL_MULTIPLIER,
  CRED_PARTNER_SECRET_KEY,
  credSchemaId
};
