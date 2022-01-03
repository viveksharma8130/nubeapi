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
exports.TalentController = void 0;
const Talent_1 = require("../models/Talent");
const fs = require("fs");
class TalentController {
    static Create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileObject = {};
            if (req.files.image) {
                const imageUrl = req.files.image[0].path.replace(/\\/g, "/");
                fileObject.image = imageUrl;
            }
            if (req.files.home_image) {
                const home_imageUrl = req.files.home_image[0].path.replace(/\\/g, "/");
                fileObject.home_image = home_imageUrl;
            }
            var insert = Object.assign(Object.assign({}, req.body), fileObject);
            try {
                let talent = yield new Talent_1.default(insert).save();
                res.json({
                    message: 'Talent Save Successfully',
                    data: talent,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Talent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const talent = req.talent;
            const data = {
                message: 'Success',
                data: talent
            };
            res.json(data);
        });
    }
    static TalentCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const talent = yield Talent_1.default.find({ talent_category_id: req.talent_category._id }, { __v: 0 });
                const data = {
                    message: 'Success',
                    category: req.talent_category,
                    data: talent
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static All(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query.limit) {
                    console.log(req.query.limit);
                    var talent = yield Talent_1.default.find({ status: true }, { __v: 0 }).limit(parseInt(req.query.limit)).sort({ sequence: 1 }).populate({ path: 'talent_category_id' });
                }
                else {
                    var talent = yield Talent_1.default.find({ status: true }, { __v: 0 }).sort({ sequence: 1 }).populate({ path: 'talent_category_id' });
                }
                const data = {
                    message: 'Success',
                    data: talent
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static adminAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const talent = yield Talent_1.default.find({}, { __v: 0 }).sort({ sequence: 1 }).populate({ path: 'talent_category_id' });
                const data = {
                    message: 'Success',
                    data: talent
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
            const talent = req.talent;
            try {
                yield fs.unlink(talent['image'], (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                }));
                yield fs.unlink(talent['home_image'], (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                }));
                yield talent.remove();
                res.json({
                    message: 'Success ! Talent Deleted Successfully',
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
            const talentId = req.talent._id;
            let fileObject = {};
            if (req.files.image) {
                const imageUrl = req.files.image[0].path.replace(/\\/g, "/");
                fileObject.image = imageUrl;
            }
            if (req.files.home_image) {
                const home_imageUrl = req.files.home_image[0].path.replace(/\\/g, "/");
                fileObject.home_image = home_imageUrl;
            }
            var update = Object.assign(Object.assign(Object.assign({}, req.body), fileObject), { updated_at: new Date() });
            try {
                const talent = yield Talent_1.default.findOneAndUpdate({ _id: talentId }, update, { new: true, useFindAndModify: false });
                res.send(talent);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.TalentController = TalentController;
