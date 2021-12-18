import * as TFactor from "2factor";
import { getEnvironmentVariables } from "../environments/env";

export class SendOtp {

    static sendOtp(data:{to:number, otp:number}){

        const TwoFactor = new TFactor(getEnvironmentVariables().Twofactor_key);

        TwoFactor.sendOTP(data.to, {otp: data.otp}).then((sessionId) => {
            return true;
        }, (error) => {
            return error;
        });

    }

}