import * as Multer from "multer";
import * as moment from 'moment-timezone';
import * as Bcrypt from 'bcrypt';

// admin upload
const adminStorageOptions=Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/admin')
    },
    filename: function (req, file, cb) {
        //cb(null, file.originalname)
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.mimetype.split("/")[1])
    }
});
const adminFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// work upload
const workStorageOptions=Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/work')
    },
    filename: function (req, file, cb) {
        //cb(null, file.originalname)
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.mimetype.split("/")[1])
    }
});
const workFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// talent_Portfolio upload
const talentPortfolioStorageOptions=Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/portfolio')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.mimetype.split("/")[1] )
    }
});
const talentPortfolioFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// talent upload
const talentStorageOptions=Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/talent')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.originalname.split('.').pop())
    }
});
const talentFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'audio/mpeg' || file.mimetype ==='audio/mp3') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// adBanner upload
const adBannerStorageOptions=Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/ad_banner')
    },
    filename: function (req, file, cb) {
        //cb(null, file.originalname)
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.mimetype.split("/")[1])
    }
});
const adBannerFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export class Utils{
    // OTP VALIDATE TIME 
    public MAX_TOKEN_TIME=60000; // In MilliSeconds

    // MULTER FOR FILE UPLOAD IN DIFFERRENT API'S 
    public TalentMulter = Multer({storage:talentStorageOptions, fileFilter:talentFileFilter});
    public TalentPortfolioMulter = Multer({storage:talentPortfolioStorageOptions, fileFilter:talentPortfolioFileFilter});
    public adBannerMulter = Multer({storage:adBannerStorageOptions, fileFilter:adBannerFileFilter});
    public adminMulter = Multer({storage:adminStorageOptions, fileFilter:adminFileFilter});
    public workMulter = Multer({storage:workStorageOptions, fileFilter:workFileFilter});

    // INDIAN TIMEZONE FOR ALL SCHEMAS
    public indianTimeZone = moment.tz(Date.now(), "Asia/Kolkata").add(5, 'hours').add(30, 'minute');

    static indianTimeZone(){
        return moment.tz(Date.now(), "Asia/Kolkata").add(5, 'hours').add(30, 'minute');//.format('YYYY-MM-DD hh:mm:ss')
    }

    // Encrypt Password
    static encryptPassword(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            })
        })
    }

    // Compare Password
    static async comparePassword(password: { plainPassword: string, encryptedPassword: string }): Promise<any> {
        return new Promise(((resolve, reject) => {
            Bcrypt.compare(password.plainPassword, password.encryptedPassword, ((err, isSame) => {
                if (err) {
                    reject(err);
                } else if (!isSame) {
                    reject(new Error('User Password Does not Match'));
                } else {
                    resolve(true);
                }
            }))
        }))
    }

    // GENERATE OTP
    static generateVerificationToken(size: number=4){
        let digits='0123456789';
        let otp='';
        for(let i=0;i<size;i++){
            otp+=digits[Math.floor(Math.random()*10)];
        }
        return parseInt(otp);
    }




}