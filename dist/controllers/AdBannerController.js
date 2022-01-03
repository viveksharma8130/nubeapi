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
exports.AdBannerController = void 0;
const AdBanner_1 = require("../models/AdBanner");
class AdBannerController {
    static Create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = req.body.category;
            const respective_id = req.body.respective_id;
            try {
                const data = {
                    category: category,
                    respective_id: respective_id,
                };
                let fileObject = {};
                if (req.file) {
                    const postUrl = req.file.path.replace(/\\/g, "/");
                    fileObject.banner = postUrl;
                }
                var insert = Object.assign(Object.assign({}, fileObject), data);
                let adBanner = yield new AdBanner_1.default(insert).save();
                res.json({
                    message: 'Category Save Successfully',
                    data: adBanner,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const AdBannerId = req.AdBanner._id;
            try {
                let fileObject = {};
                if (req.file) {
                    const postUrl = req.file.path.replace(/\\/g, "/");
                    fileObject.banner = postUrl;
                }
                var insert = Object.assign(Object.assign({}, fileObject), req.body);
                const adBanner = yield AdBanner_1.default.findOneAndUpdate({ _id: AdBannerId }, insert, { new: true, useFindAndModify: false });
                res.send(adBanner);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Ad(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const adBanner = req.adBanner;
            const data = {
                message: 'Success',
                data: adBanner
            };
            res.json(data);
        });
    }
    static CategoryAd(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const adBanner = req.adBanner;
            const data = {
                message: 'Success',
                data: adBanner
            };
            res.json(data);
        });
    }
    static AllAd(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adBanner = yield AdBanner_1.default.find({ status: true }, { __v: 0 });
                const data = {
                    message: 'Success',
                    data: adBanner
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const adBanner = req.adBanner;
            try {
                yield adBanner.remove();
                res.json({
                    message: 'Success ! AdBanner Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.AdBannerController = AdBannerController;
