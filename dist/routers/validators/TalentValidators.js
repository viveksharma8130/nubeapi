"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TalentValidators = void 0;
const express_validator_1 = require("express-validator");
const Talent_1 = require("../../models/Talent");
const TalentCategory_1 = require("../../models/TalentCategory");
class TalentValidators {
    static create() {
        return [(0, express_validator_1.body)('talent_category_id', 'Talent Category Is Required').isAlphanumeric().custom((talent_category_id, { req }) => {
                return TalentCategory_1.default.findOne({ _id: talent_category_id }).then(talent_category => {
                    if (talent_category) {
                        return true;
                    }
                    else {
                        throw new Error('Talent Category Not Exist');
                    }
                });
            }),
            (0, express_validator_1.body)('name', 'name is Required').isString(),
            (0, express_validator_1.body)('slug', 'slug is Required').isString(),
            (0, express_validator_1.body)('designation', 'description is Required').isString(),
            (0, express_validator_1.body)('about', 'about is Required').isString(),
            (0, express_validator_1.body)('content', 'content is Required').isString(),
            (0, express_validator_1.body)('contact_name', 'contact_name is Required').isString(),
            (0, express_validator_1.body)('contact_email', 'contact_email is Required').isString(),
        ];
    }
    static Talent() {
        return [(0, express_validator_1.param)('slug').custom((slug, { req }) => {
                return Talent_1.default.findOne({ slug: slug }, { __v: 0 }).populate([{ path: "talent_category_id" }, { path: "portfolios" }]).then((talent) => {
                    if (talent) {
                        req.talent = talent;
                        return true;
                    }
                    else {
                        throw new Error('Talent Does Not Exist');
                    }
                });
            })];
    }
    static Talent_category() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return TalentCategory_1.default.findOne({ _id: id }, { __v: 0 }).then((talent_category) => {
                    if (talent_category) {
                        req.talent_category = talent_category;
                        return true;
                    }
                    else {
                        throw new Error('Talent Category Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Talent_1.default.findOne({ _id: id }, { __v: 0 }).then((talent) => {
                    if (talent) {
                        req.talent = talent;
                        return true;
                    }
                    else {
                        throw new Error('Talent Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Talent_1.default.findOne({ _id: id }, { __v: 0 }).then((talent) => {
                    if (talent) {
                        req.talent = talent;
                        return true;
                    }
                    else {
                        throw new Error('Talent Does Not Exist');
                    }
                });
            })];
    }
}
exports.TalentValidators = TalentValidators;
