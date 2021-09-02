import { logger, hypersignSDK, whitelistingSchemaId, nodeServer, hostnameurl, hsAuthServerEp, REFFERAL_MULTIPLIER } from "../config";
import { Request, Response, NextFunction } from "express";
import InvestorModel, { IInvestor } from "../models/investor";
let { template :credentialMailTemplate} = require('../services/mail.template');
import MailService from '../services/mail.service';
import ApiError from '../error/apiError';


const jsonWebToken = require('jsonwebtoken');

const { keys: issuerKeyPair,  mail, jwt } = require("../../hypersign.json");

function isHypersignDid(did){
  if(!did || did === "") return false;
  return (did.indexOf('did:hs:') > -1);
}

async function addInvestor(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info("InvestorController:: addInvestor() method start..");
    const { did, email, name, ethAddress, twitterHandle, telegramHandle, hasTwitted, hasJoinedTGgroup,  projectId, tweetUrl  } = req.body;
    const { referrer } = req.query; // did of guy who have refered
    logger.info("InvestorController:: addInvestor(): referrer = " + referrer)
    const isComingFromReferal = referrer && isHypersignDid(referrer) && did != referrer; 
    logger.info("InvestorController:: addInvestor(): isComingFromReferal = " + isComingFromReferal)

    logger.info("InvestorController:: addInvestor(): before findning investor by did = " + did);
    const investor:IInvestor = await InvestorModel.where({ did: did, projectId: projectId }).findOne();

    logger.info("InvestorController:: addInvestor(): before findning investor by email = " + email);
    const investor_email:IInvestor = await InvestorModel.where({ email: email, projectId: projectId }).findOne();

    if(investor != null){ 
      logger.info("InvestorController:: addInvestor(): investor by did is non null so throwing");
      return next(ApiError.badRequest('More than one submition is not allowed from this did'));
    }

    if(investor_email != null){
      logger.info("InvestorController:: addInvestor(): investor by email is non null so throwing");
      return next(ApiError.badRequest('More than one submition is not allowed from this emailId'));
    }

    logger.info("InvestorController:: addInvestor(): before creating a new investor into db");
    const isVerificationComplete = hasTwitted && hasJoinedTGgroup;
    const new_investor: IInvestor = await InvestorModel.create({
      did, 
      email, 
      name, 
      ethAddress, 
      twitterHandle, 
      telegramHandle, 
      hasTwitted, 
      hasJoinedTGgroup, 
      isVerfiedByHypersign: false,
      isVerificationComplete,
      projectId,
      tweetUrl,
      numberOfReferals: !isComingFromReferal ? 0 : 0.5 * REFFERAL_MULTIPLIER
    });
    logger.info("InvestorController:: addInvestor(): after creating a new investor into db id = " + new_investor["_id"]);

    // update the followers if refere is present in query
    if(isComingFromReferal){
      const filter = { did: referrer, projectId };

      // find the refere 
      logger.info("InvestorController:: addInvestor(): before fetchin the refer from db");
      const investor:IInvestor = await InvestorModel.where(filter).findOne();
      if(investor){
        logger.info("InvestorController:: addInvestor(): after fetchin the refer from db id = " + investor.did);
        
        // update the refere followers
        const updateParams = {
          numberOfReferals: (investor.numberOfReferals + ( 1 * REFFERAL_MULTIPLIER))
        };
  
        logger.info("InvestorController:: addInvestor(): updateParams = " + JSON.stringify(updateParams));
        logger.info("InvestorController:: addInvestor(): before updating an investor into db");
        updateInvestorInDb(filter, updateParams);
        logger.info("InvestorController:: addInvestor(): after updating an investor into db");
      }else{
        logger.info("InvestorController:: addInvestor(): could not fetch investor. filter = " + JSON.stringify(filter));
      }
    }

    issueCredential(req, res, next);
    // res.send(new_investor);
  } catch (e) {
    logger.error("InvestorController:: addInvestor(): Error " + e);
    next(ApiError.internal(e.message));
  }finally{
    logger.info("InvestorController:: addInvestor method ends.");
  }
}

async function getAllInvestor(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info("InvestorController:: getAllInvestor method start..");
    const employeeList:Array<IInvestor> = await InvestorModel.find(req.query);
    res.send(employeeList);
  } catch (e) {
    logger.error('InvestorController:: getAllInvestor(): Error ' + e);
    next(ApiError.internal(e.message));
  }finally{
    logger.info("InvestorController:: getAllInvestor method ends.");
  }
}

async function getInvestorByDID(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info("InvestorController:: getInvestorByDID method start..");
    const { did } = req.params;
    
    const investors:Array<IInvestor> = await InvestorModel.where({did: did}).find(); // one investor can participate into multiple projects
    res.send(investors);
  } catch (e) {
    logger.error('InvestorController:: getInvestorByDID(): Error ' + e);
    next(ApiError.internal(e.message));
  }finally{
    logger.info("InvestorController:: getAllInvestor method ends.");
  }
}

async function updateInvestorInDb(filter, updateParams){

  const opts = { new: true, useFindAndModify: true };
  
  const investor: IInvestor = await InvestorModel.findOneAndUpdate(filter, updateParams, opts);

  if(!investor){
    throw new Error("No investor found")
  }
  return investor;

}

async function updateInvestor(req: Request, res: Response, next: NextFunction){
  try{
    logger.info("InvestorController:: updateInvestor method start..");

    const { did  } = req.params;
    const projectId: any = req.query.projectId;
    logger.info("InvestorController:: updateInvestor(): projectId = "+ projectId);
    logger.info("InvestorController:: updateInvestor(): did = "+ did);

    const filter = { did, projectId };
    const updateParams = req.body;
    
    logger.info("InvestorController:: updateInvestor(): before updating an investor into db");
    const updatedInvetor1 = await updateInvestorInDb(filter, updateParams);
    logger.info("InvestorController:: updateInvestor(): after updating an investor into db");

    
    res.send(updatedInvetor1);

  } catch (e){
    logger.error('InvestorController:: updateInvestor(): Error ' + e);
    next(ApiError.internal(e.message)); 
  }finally{
    logger.info("InvestorController:: updateInvestor method ends.");
  }
}

async function getCredential(req: Request, res: Response, next: NextFunction) {
  try{
    logger.info("InvestorController:: getCredential method start..");

    const { token } =  req.query;

    if(!token){
      logger.info("InvestorController:: getCredential(): token is null");
      return next(ApiError.badRequest("WT token is not passed in query params"));
    }

    logger.info("InvestorController:: getCredential(): before jwt verification");
    const attributesMap = await jsonWebToken.verify(token, jwt.secret);
    logger.info("InvestorController:: getCredential(): after jwt verification");

    if(!attributesMap){
      logger.info("InvestorController:: getCredential(): attributesMap is null");
      return next(ApiError.badRequest("Could not verify JWT token"));
    }
  
    const { did, projectId } = attributesMap;
    delete attributesMap["did"];
    delete attributesMap["projectId"];
    delete attributesMap["iat"];
    delete attributesMap["exp"];

    const schemaUrl = nodeServer.baseURl + nodeServer.schemaGetEp + whitelistingSchemaId;
    logger.info("InvestorController:: getCredential(): schemaUrl = " + schemaUrl);
    logger.info("InvestorController:: getCredential(): before generaating raw Credential");

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
    logger.info("InvestorController:: getCredential(): after generaating raw Credential");

    logger.info("InvestorController:: getCredential(): before signCredential issuerKeyPair.publicKey.id = " + issuerKeyPair.publicKey.id);
    const signedCredential = await hypersignSDK.credential.signCredential(rawCredential, issuerKeyPair.publicKey.id, issuerKeyPair.privateKeyBase58)
    logger.info("InvestorController:: getCredential(): after signCredential");

    res.send({
      status: 200,
      message:signedCredential,
      error: null
    });


    // Finally (in backgroud) update that this investor is verifed by Hypersign
    const filter = { did, projectId };
    logger.info("InvestorController:: getCredential(): filter " + JSON.stringify(filter));
    const updateParams = { isVerfiedByHypersign: true };

    logger.info("InvestorController:: getCredential(): before calling updateInvestorInDb()");
    updateInvestorInDb(filter, updateParams);
    logger.info("InvestorController:: getCredential(): after calling updateInvestorInDb()");

  } catch (e){
    logger.error('InvestorController:: getCredential(): Error ' + e);
    next(ApiError.internal(e.message));
  } finally {
    logger.info("InvestorController:: getCredential method ends.");
  }
}


async function sendEmail(data){
  const token = await jsonWebToken.sign(data, jwt.secret, { expiresIn: jwt.expiryTime })
  let link = `${hostnameurl}/api/v1/investors/credential?token=${token}`;
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
    logger.info("InvestorController:: issueCredential method starts...");
    const { did,  projectId  } = req.body;

    const investor:IInvestor = await InvestorModel.where({ did: did, projectId: projectId }).findOne();

    if(!investor || !investor["_doc"]){
      logger.info("InvestorController:: issueCredential(): no investor found");
      return next(ApiError.badRequest("no investor found"));
    }

    if(!(investor.hasTwitted && investor.hasJoinedTGgroup && investor.isVerificationComplete)){
      logger.info("InvestorController:: issueCredential(): Investor has not yet verifed");
      return next(ApiError.badRequest("Investor has not yet verifed"));
    }

    if(investor && investor.isVerfiedByHypersign === true){
      logger.info("InvestorController:: issueCredential(): Investor has already been verifed");
      return next(ApiError.badRequest("Investor has already been verifed"));
    }

    let attributesMap = {
      name: "",
      email: "",
      blockchainAddress: "",
      twitterHandle: "",
      telegramHandle: "",
      did: "",
      projectId: ""
    }

    Object.keys(attributesMap).map(x => {
      attributesMap[x] = investor["_doc"][x]
    })

    attributesMap.blockchainAddress = investor["_doc"]["ethAddress"];
      
    logger.info("InvestorController:: issueCredential(): before sending email to " + JSON.stringify(attributesMap));
    const link = await sendEmail(attributesMap);
    logger.info("InvestorController:: issueCredential(): after sending email");


    // res.send({message: "Whitelisting credential has been successfully sent to the investor email", credentialUrl: link})
    req.body["result"] = {message: "Whitelisting credential has been successfully sent to the investor email", credentialUrl: link}
    return next()

  } catch (e){
    logger.error('InvestorController:: issueCredential(): Error ' + e);
    next(ApiError.internal(e.message));
  }finally{
    logger.info("InvestorController:: issueCredential method ends.");
  }
}

export default {
  addInvestor,
  getInvestorByDID,
  getAllInvestor,
  issueCredential,
  updateInvestor,
  getCredential
}

