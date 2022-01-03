"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TalentCategoryValidators = void 0;
const express_validator_1 = require("express-validator");
const TalentCategory_1 = require("../../models/TalentCategory");
class TalentCategoryValidators {
    static create() {
        return [
            (0, express_validator_1.body)('category', 'Audio Category Name Is Required').custom((category, { req }) => {
                return TalentCategory_1.default.findOne({ category: category }).then(talentCategory => {
                    if (talentCategory) {
                        throw new Error('Audio Category Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            })
        ];
    }
    static category() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return TalentCategory_1.default.findOne({ _id: id }, { __v: 0 }).then((talentCategory) => {
                    if (talentCategory) {
                        req.talentCategory = talentCategory;
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
                return TalentCategory_1.default.findOne({ _id: id }, { __v: 0 }).then((talentCategory) => {
                    if (talentCategory) {
                        req.talentCategory = talentCategory;
                        return true;
                    }
                    else {
                        throw new Error('Talent Category Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return TalentCategory_1.default.findOne({ _id: id }, { __v: 0 }).then((talentCategory) => {
                    if (talentCategory) {
                        req.talentCategory = talentCategory;
                        return true;
                    }
                    else {
                        throw new Error('Talent Category Does Not Exist');
                    }
                });
            })];
    }
}
exports.TalentCategoryValidators = TalentCategoryValidators;
