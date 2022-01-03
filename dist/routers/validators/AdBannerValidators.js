"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdBannerValidators = void 0;
const express_validator_1 = require("express-validator");
const AdBanner_1 = require("../../models/AdBanner");
class AdBannerValidators {
    static create() {
        return [
            (0, express_validator_1.body)('category', 'Category Name Is Required'),
            (0, express_validator_1.body)('respective_id', 'respective_id Is Required'),
        ];
    }
    static ad() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return AdBanner_1.default.findOne({ _id: id }, { __v: 0 }).then((adBanner) => {
                    if (adBanner) {
                        req.adBanner = adBanner;
                        return true;
                    }
                    else {
                        throw new Error('Ad Banner Does Not Exist');
                    }
                });
            })];
    }
    static categoryAd() {
        return [(0, express_validator_1.param)('category').custom((category, { req }) => {
                return AdBanner_1.default.find({ category: category }, { __v: 0 }).then((adBanner) => {
                    if (adBanner) {
                        req.adBanner = adBanner;
                        return true;
                    }
                    else {
                        throw new Error('Ad Banner Category Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return AdBanner_1.default.findOne({ _id: id }, { __v: 0 }).then((adBanner) => {
                    if (adBanner) {
                        req.adBanner = adBanner;
                        return true;
                    }
                    else {
                        throw new Error('Ad Banner Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return AdBanner_1.default.findOne({ _id: id }, { __v: 0 }).then((adBanner) => {
                    if (adBanner) {
                        req.adBanner = adBanner;
                        return true;
                    }
                    else {
                        throw new Error('Ad Banner Does Not Exist');
                    }
                });
            })];
    }
}
exports.AdBannerValidators = AdBannerValidators;
