"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const Multer = require("multer");
const moment = require("moment-timezone");
const Bcrypt = require("bcrypt");
// admin upload
const adminStorageOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/admin');
    },
    filename: function (req, file, cb) {
        //cb(null, file.originalname)
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.mimetype.split("/")[1]);
    }
});
const adminFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
// work upload
const workStorageOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/work');
    },
    filename: function (req, file, cb) {
        //cb(null, file.originalname)
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.mimetype.split("/")[1]);
    }
});
const workFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
// talent_Portfolio upload
const talentPortfolioStorageOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/portfolio');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.mimetype.split("/")[1]);
    }
});
const talentPortfolioFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
// talent upload
const talentStorageOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/talent');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.originalname.split('.').pop());
    }
});
const talentFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
// adBanner upload
const adBannerStorageOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/ad_banner');
    },
    filename: function (req, file, cb) {
        //cb(null, file.originalname)
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.mimetype.split("/")[1]);
    }
});
const adBannerFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
class Utils {
    constructor() {
        // OTP VALIDATE TIME 
        this.MAX_TOKEN_TIME = 60000; // In MilliSeconds
        // MULTER FOR FILE UPLOAD IN DIFFERRENT API'S 
        this.TalentMulter = Multer({ storage: talentStorageOptions, fileFilter: talentFileFilter });
        this.TalentPortfolioMulter = Multer({ storage: talentPortfolioStorageOptions, fileFilter: talentPortfolioFileFilter });
        this.adBannerMulter = Multer({ storage: adBannerStorageOptions, fileFilter: adBannerFileFilter });
        this.adminMulter = Multer({ storage: adminStorageOptions, fileFilter: adminFileFilter });
        this.workMulter = Multer({ storage: workStorageOptions, fileFilter: workFileFilter });
        // INDIAN TIMEZONE FOR ALL SCHEMAS
        this.indianTimeZone = moment.tz(Date.now(), "Asia/Kolkata").add(5, 'hours').add(30, 'minute');
    }
    static indianTimeZone() {
        return moment.tz(Date.now(), "Asia/Kolkata").add(5, 'hours').add(30, 'minute'); //.format('YYYY-MM-DD hh:mm:ss')
    }
    // Encrypt Password
    static encryptPassword(password) {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(hash);
                }
            });
        });
    }
    // Compare Password
    static comparePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(((resolve, reject) => {
                Bcrypt.compare(password.plainPassword, password.encryptedPassword, ((err, isSame) => {
                    if (err) {
                        reject(err);
                    }
                    else if (!isSame) {
                        reject(new Error('User Password Does not Match'));
                    }
                    else {
                        resolve(true);
                    }
                }));
            }));
        });
    }
    // GENERATE OTP
    static generateVerificationToken(size = 4) {
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return parseInt(otp);
    }
}
exports.Utils = Utils;
