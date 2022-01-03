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
exports.AdminController = void 0;
const Jwt = require("jsonwebtoken");
const env_1 = require("../environments/env");
const Admin_1 = require("../models/Admin");
const Utils_1 = require("../utils/Utils");
class AdminController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const name = req.body.name;
            const password = req.body.password;
            const hash = yield Utils_1.Utils.encryptPassword(password);
            try {
                const data = {
                    email: email,
                    password: hash,
                    name: name,
                    created_at: new Utils_1.Utils().indianTimeZone,
                    updated_at: new Utils_1.Utils().indianTimeZone
                };
                let admin = yield new Admin_1.default(data).save();
                if (admin) {
                    const para = {
                        admin_id: admin._id,
                        email: email
                    };
                    const token = Jwt.sign(para, (0, env_1.getEnvironmentVariables)().jwt_secret, { expiresIn: '120d' });
                    const data = {
                        message: 'Success',
                        token: token,
                        data: admin
                    };
                    res.json(data);
                }
                else {
                    throw new Error('Something Went Wrong');
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = req.query.password;
            const admin = req.admin;
            try {
                yield Utils_1.Utils.comparePassword({
                    plainPassword: password,
                    encryptedPassword: admin.password
                });
                const token = Jwt.sign({ email: admin.email, admin_id: admin._id }, (0, env_1.getEnvironmentVariables)().jwt_secret, { expiresIn: '120d' });
                const data = { token: token, data: admin };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminId = req.admin.admin_id;
            let data = {};
            if (req.files.profile_pic) {
                const profile_picUrl = req.files.profile_pic[0].path.replace(/\\/g, "/");
                data.profile_pic = profile_picUrl;
            }
            if (req.body.password) {
                const password = yield Utils_1.Utils.encryptPassword(req.body.password);
                data.password = password;
            }
            if (req.body.name) {
                const name = req.body.name;
                data.name = name;
            }
            if (req.body.homepage_work_content) {
                const homepage_work_content = req.body.homepage_work_content;
                data.homepage_work_content = homepage_work_content;
            }
            var update = Object.assign(Object.assign({}, data), { updated_at: new Date() });
            try {
                const admin = yield Admin_1.default.findOneAndUpdate({ _id: adminId }, update, { new: true, useFindAndModify: false });
                res.send(admin);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static data(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var adminId = req.admin.admin_id;
            try {
                var admin = yield Admin_1.default.findById({ _id: adminId }, { __v: 0 });
                const data = {
                    message: 'Success',
                    admin: admin
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static all(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield Admin_1.default.find({});
                const data = {
                    message: 'Success',
                    Admin: admin
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.AdminController = AdminController;
