"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TalentPortfolioValidators = void 0;
const express_validator_1 = require("express-validator");
const TalentPortfolio_1 = require("../../models/TalentPortfolio");
const Talent_1 = require("../../models/Talent");
class TalentPortfolioValidators {
    static add() {
        return [
            (0, express_validator_1.body)('talent_id', 'Talent_id Is Required').isAlphanumeric().custom((talent_id, { req }) => {
                return Talent_1.default.findOne({ _id: talent_id }).then(talent => {
                    if (talent) {
                        return true;
                    }
                    else {
                        throw new Error('post Not Exist');
                    }
                });
            }),
            (0, express_validator_1.body)('media_type', 'media_type Is Required')
        ];
    }
    static TalentPortfolio() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return TalentPortfolio_1.default.find({ talent_id: id }, { __v: 0 }).populate({ path: 'talent_id' }).then((talentPortfolio) => {
                    if (talentPortfolio) {
                        req.talentPortfolio = talentPortfolio;
                        return true;
                    }
                    else {
                        throw new Error('talentPortfolio Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return TalentPortfolio_1.default.findOne({ _id: id }, { __v: 0 }).then((talentPortfolio) => {
                    if (talentPortfolio) {
                        req.talentPortfolio = talentPortfolio;
                        return true;
                    }
                    else {
                        throw new Error('talentPortfolio Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return TalentPortfolio_1.default.findOne({ _id: id }, { __v: 0 }).then((talentPortfolio) => {
                    if (talentPortfolio) {
                        req.talentPortfolio = talentPortfolio;
                        return true;
                    }
                    else {
                        throw new Error('TalentPortfolio Does Not Exist');
                    }
                });
            })];
    }
}
exports.TalentPortfolioValidators = TalentPortfolioValidators;
