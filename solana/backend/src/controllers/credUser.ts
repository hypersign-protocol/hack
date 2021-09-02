import { logger, hypersignSDK, credSchemaId, nodeServer, hostnameurl, hsAuthServerEp, REFFERAL_MULTIPLIER } from "../config";
import { Request, Response, NextFunction } from "express";
let { template :credentialMailTemplate} = require('../services/mail.template');
import MailService from '../services/mail.service';
import ApiError from '../error/apiError';

const jsonWebToken = require('jsonwebtoken');
const { keys: issuerKeyPair,  mail, jwt } = require("../../hypersign.json");

async function getCredential(req: Request, res: Response, next: NextFunction) {
  try{
    logger.info("CredController:: getCredential method start..");

    const { token } =  req.query;

    if(!token){
      logger.info("CredController:: getCredential(): token is null");
      return next(ApiError.badRequest("WT token is not passed in query params"));
    }

    logger.info("CredController:: getCredential(): before jwt verification");
    const attributesMap = await jsonWebToken.verify(token, jwt.secret);
    logger.info("CredController:: getCredential(): after jwt verification");

    if(!attributesMap){
      logger.info("CredController:: getCredential(): attributesMap is null");
      return next(ApiError.badRequest("Could not verify JWT token"));
    }
  
    const { did } = attributesMap;
    delete attributesMap["did"];
    delete attributesMap["iat"];
    delete attributesMap["exp"];

    const schemaUrl = nodeServer.baseURl + nodeServer.schemaGetEp + credSchemaId;
    logger.info("CredController:: getCredential(): schemaUrl = " + schemaUrl);
    logger.info("CredController:: getCredential(): before generaating raw Credential");

    logger.info({
      subjectDid: did,
      issuerDid: issuerKeyPair.publicKey.id,
      expirationDate: new Date().toISOString(),
      attributesMap
    });


    const rawCredential = await hypersignSDK.credential.generateCredential(schemaUrl, {
      subjectDid: did,
      issuerDid: issuerKeyPair.publicKey.id,
      expirationDate: new Date().toISOString(),
      attributesMap
    });

    logger.info("CredController:: getCredential(): after generaating raw Credential");

    logger.info("CredController:: getCredential(): before signCredential issuerKeyPair.publicKey.id = " + issuerKeyPair.publicKey.id);
    const signedCredential = await hypersignSDK.credential.signCredential(rawCredential, issuerKeyPair.publicKey.id, issuerKeyPair.privateKeyBase58)
    logger.info("CredController:: getCredential(): after signCredential");

    res.send({
      status: 200,
      message:signedCredential,
      error: null
    });    
    
  } catch (e){
    logger.error('CredController:: getCredential(): Error ' + e);
    next(ApiError.internal(e.message));
  } finally {
    logger.info("CredController:: getCredential method ends.");
  }
}

async function sendEmail(data){
  const token = await jsonWebToken.sign(data, jwt.secret, { expiresIn: jwt.expiryTime })
  let link = `${hostnameurl}/api/v1/cred/credential?token=${token}`;
  let mailTemplateTemp = credentialMailTemplate;
  mailTemplateTemp = mailTemplateTemp.replace(/@@APPNAME@@/g, mail.name);
  mailTemplateTemp = mailTemplateTemp.replace('@@RECEIVERNAME@@', data.name);
  mailTemplateTemp = mailTemplateTemp.replace('@@LINK@@', link);
  const JSONdata = JSON.stringify({
      QRType: 'ISSUE_CRED',
      url: link
  });
  const deepLinkUrl = encodeURI(hsAuthServerEp + 'deeplink.html?deeplink=hypersign:deeplink?url=' + JSONdata);
  mailTemplateTemp = mailTemplateTemp.replace("@@DEEPLINKURL@@", deepLinkUrl);
  mailTemplateTemp = mailTemplateTemp.replace("@@URLTEXT@@", deepLinkUrl);

  const mailService = new MailService({ ...mail });
  await mailService.sendEmail(data.email, mailTemplateTemp, `Congratulations! You are successfully verified with Hypersign`);
  return link;
}

async function issueCredential(req: Request, res: Response, next: NextFunction){
  try{
    logger.info("CredController:: issueCredential method starts...");
    
    // const { name ,    email ,    phoneNumber ,    trustScore ,    credCoin ,    blockchainAddress   } = req.body;

    let attributesMap = {
      name: "",
        email: "",
        phoneNumber: "",
        trustScore: "",
        credCoin: "",
        blockchainAddress: "",
        did: "",
    }

    Object.keys(attributesMap).map(x => {
      attributesMap[x] = req.body[x]
    })

    attributesMap.did = req.body.userData.id;

    console.log(attributesMap);
      
    logger.info("CredController:: issueCredential(): before sending email to " + JSON.stringify(attributesMap));
    const link = await sendEmail(attributesMap);
    logger.info("CredController:: issueCredential(): after sending email");


    // res.send({message: "Whitelisting credential has been successfully sent to the investor email", credentialUrl: link})
    res.status(200).send({message: "Whitelisting credential has been successfully sent to the investor email", credentialUrl: link})
    // req.body["result"] = {message: "Whitelisting credential has been successfully sent to the investor email", credentialUrl: link}
    // return next()

  } catch (e){
    logger.error('CredController:: issueCredential(): Error ' + e);
    next(ApiError.internal(e.message));
  }finally{
    logger.info("CredController:: issueCredential method ends.");
  }
}

export default {
  issueCredential,
  getCredential
}

