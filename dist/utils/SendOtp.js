"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOtp = void 0;
const TFactor = require("2factor");
const env_1 = require("../environments/env");
class SendOtp {
    static sendOtp(data) {
        const TwoFactor = new TFactor((0, env_1.getEnvironmentVariables)().Twofactor_key);
        TwoFactor.sendOTP(data.to, { otp: data.otp }).then((sessionId) => {
            return true;
        }, (error) => {
            return error;
        });
    }
}
exports.SendOtp = SendOtp;
