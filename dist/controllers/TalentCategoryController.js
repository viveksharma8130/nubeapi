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
exports.TalentCategoryController = void 0;
const TalentCategory_1 = require("../models/TalentCategory");
class TalentCategoryController {
    static Create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let talentCategory = yield new TalentCategory_1.default(req.body).save();
                res.json({
                    message: 'Talent Category Save Successfully',
                    data: talentCategory,
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
            const talentCategoryId = req.talentCategory._id;
            try {
                const talentCategory = yield TalentCategory_1.default.findOneAndUpdate({ _id: talentCategoryId }, req.body, { new: true, useFindAndModify: false });
                res.send(talentCategory);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Category(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const talentCategory = req.talentCategory;
            const data = {
                message: 'Success',
                data: talentCategory
            };
            res.json(data);
        });
    }
    static AllCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const talentCategory = yield TalentCategory_1.default.find({ status: true }, { __v: 0 }).sort({ sequence: 1 }).populate({ path: 'talents' });
                const data = {
                    message: 'Success',
                    data: talentCategory
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static AllAdminCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const talentCategory = yield TalentCategory_1.default.find().sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: talentCategory
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
            const talentCategory = req.talentCategory;
            try {
                yield talentCategory.remove();
                res.json({
                    message: 'Success ! Talent Category Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.TalentCategoryController = TalentCategoryController;
