import { validationResult } from "express-validator";
import * as Jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/env";

export class GlobalMiddleWare{
    static checkError(req,res,next){
        const error = validationResult(req);

        if (!error.isEmpty()){
            next(new Error(error.array()[0].msg));
        }else{
            next();
        }
    }

    // for admin
    static async adminAuthenticate(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.slice(7, authHeader.length) : null;
        try {
            Jwt.verify(token, getEnvironmentVariables().jwt_secret, (async (err, decoded) => {
                if (err) {
                    next(err)
                } else if (!decoded) {
                    req.errorStatus = 401;
                    next(new Error('Admin Not Authorised'))
                } else {
                    req.admin = decoded;
                    next();
                }
            }))
        } catch (e) {
            req.errorStatus = 401;
            next(e);
        }
    }


}