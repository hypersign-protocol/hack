import { CRED_PARTNER_SECRET_KEY } from '../config';
import fetch from 'node-fetch';


export default class CredService {
    credHeader;
    constructor(){
        this.credHeader = {
            "content-type":  "application/json",
            "credaccess-secret-key": CRED_PARTNER_SECRET_KEY
        }
        
        console.log(this.credHeader)
    }

    // POST
    generateOTP({ phoneNumber }): Promise<Object>{

        return new Promise(async (resolve, reject) => {
            try{
               
                const raw = JSON.stringify({
                    "phone": phoneNumber
                });

                const requestOptions = {
                    method: 'POST',
                    headers: this.credHeader,
                    body: raw,
                    redirect: 'follow'
                };

                const resp =  await fetch("https://credaccess.web.app/auth/generateOtp", requestOptions);
                const json =  await resp.json(); // {"token":"U2FsdGVkX1+23ETMnMXMn0c8XZAz3Zef0m51lBRpHqg="}
                resolve(json);
                
            }catch(e){
                reject(e)
            }
        })
        
    }

    // POST
    verifyOTP({ otp, token }):  Promise<Object>{
        return new Promise(async (resolve, reject) => {
            try{
                var raw = JSON.stringify({
                    "token": token,
                    "otp": otp 
                });
    
                var requestOptions = {
                    method: 'POST',
                    headers: this.credHeader,
                    body: raw,
                    redirect: 'follow'
                };
    
                const resp =  await fetch("https://credaccess.web.app/auth/verifyOtp", requestOptions);
                const json =  await resp.json();  // {"access_token":"a5473593190c12b6c1ca6250573bbe54","existing_user":true}
                console.log(json)
                if(!json || !json.access_token) throw new Error("Invalid OTP or Token");

                const profile = await this.getUserProfile({ access_token: json.access_token });
                if(!profile || profile == {})  throw new Error("Invalid access token")
                resolve(profile);
            }catch(e){
                reject(e)
            }
            
        })
    }

    // GET
    getUserProfile( { access_token }): Promise<Object>{
        return new Promise(async (resolve, reject) => {
            try{
                this.credHeader["credaccess-access-token"] =  access_token;
                const requestOptions = {
                    method: 'GET',
                    headers: this.credHeader,
                    redirect: 'follow'
                };
    
                const  resp = await fetch("https://credaccess.web.app/profile", requestOptions)
                const json =  await resp.json();
                
                if(!json ) throw new Error("Could not fetch cred profile");
                
                resolve(json); //{"last_name":"Srivastava","first_name":"Prateek","email":"prateek@gmail.com","coins":100000,"trust_score":82.95,"phone":"9999999999","existing_user":true}
        
            }catch(e){
                reject(e)
            }            
            
        })
    }

}