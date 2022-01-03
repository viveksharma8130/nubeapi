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
exports.TalentPortfolioController = void 0;
const TalentPortfolio_1 = require("../models/TalentPortfolio");
const fs = require("fs");
class TalentPortfolioController {
    static Add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileObject = {};
            if (req.files.media) {
                const mediaUrl = req.files.media[0].path.replace(/\\/g, "/");
                fileObject.media = mediaUrl;
            }
            var insert = Object.assign(Object.assign({}, req.body), fileObject);
            try {
                let talentPortfolio = yield new TalentPortfolio_1.default(insert).save();
                res.json({
                    message: 'TalentPortfolio Save Successfully',
                    data: talentPortfolio,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static TalentPortfolio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const talentPortfolio = req.talentPortfolio;
            const data = {
                message: 'Success',
                data: talentPortfolio
            };
            res.json(data);
        });
    }
    static All(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const talentPortfolio = yield TalentPortfolio_1.default.find().populate({ path: 'talent_id' });
                const data = {
                    message: 'Success',
                    data: talentPortfolio
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
            const talentPortfolio = req.talentPortfolio;
            try {
                yield fs.unlink(talentPortfolio['media'], (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                }));
                yield talentPortfolio.remove();
                res.json({
                    message: 'Success ! TalentPortfolio Deleted Successfully',
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
            const talentPortfolioId = req.talentPortfolio._id;
            let fileObject = {};
            if (req.files.media) {
                const mediaUrl = req.files.media[0].path.replace(/\\/g, "/");
                fileObject.media = mediaUrl;
            }
            var update = Object.assign(Object.assign(Object.assign({}, req.body), fileObject), { updated_at: new Date() });
            try {
                const talentPortfolio = yield TalentPortfolio_1.default.findOneAndUpdate({ _id: talentPortfolioId }, update, { new: true, useFindAndModify: false });
                res.send(talentPortfolio);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.TalentPortfolioController = TalentPortfolioController;
