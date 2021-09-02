import { Router } from 'express';
import { logger } from '../config';
import SubscriptionService from "../services/subscription.service";
const subscriptionService = new SubscriptionService();

export = (hypersign) => {
    const router = Router();

    router.post('/', hypersign.authenticate.bind(hypersign), async (req, res) => {
        try {
            const dataFromHypersign = req.body.hsUserData;
            const userModel = dataFromHypersign.hs_userdata;
            if (!userModel) throw new Error(`Could not fetch usermodel from Hypersign auth`)
            res.status(200).send({ status: 200, message: "Success", error: null });
        } catch (e) {
            logger.error(e)
            res.status(500).send({ status: 500, message: null, error: e.message });
        }
    })

    // use this api for verification of authorization token
    // this api gets called before each route in frontend
    router.post('/protected', hypersign.authorize.bind(hypersign), async (req, res) => {
        try {
            const user = req.body.userData;

            // added is the user has any active subscription
            const result = await subscriptionService.verify({did: user.id});
            user["isSubscribed"] = result;

            res.status(200).send({ status: 200, message: user, error: null });
        } catch (e) {
            res.status(500).send({ status: 500, message: null, error: e.message });
        }
    });
    
    return router;

}