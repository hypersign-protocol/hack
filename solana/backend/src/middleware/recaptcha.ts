
import { recaptchaSecret, recaptchaUri } from '../config'
const request = require("request");

export function verifyReCaptcha(req, res, next){
    const { rcToken } = req.query;
    if(!rcToken){
        res.status(403).send({ status: 403, message: "Please send the recaptcha token", error: null })
    }
    
    const verifyCaptchaOptions = {
        uri: recaptchaUri,
        json: true,
        form: {
            secret: recaptchaSecret,
            response: rcToken
        }
    };

    request.post(verifyCaptchaOptions, async (err, response, body) => {
        if (err) {
            throw new Error(err)
        }
        if (!body.success) {
            throw new Error(body["error-codes"].join("."))
        }

        next()
    });
}