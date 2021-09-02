import auth0 from "auth0-js";
import config from "../config";

// console.log(config);
const webAuth = new auth0.WebAuth({
  domain: config.auth0Domain,
  clientID: config.auth0ClinetId,
  responseType: "token id_token",
  scope: "openid profile email",
  redirectUri: "http://172.20.10.8:9002/connectwithtwitter",
});

export default webAuth;
