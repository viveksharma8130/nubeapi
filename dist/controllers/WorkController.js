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
exports.WorkController = void 0;
const Work_1 = require("../models/Work");
const Admin_1 = require("../models/Admin");
class WorkController {
    static Add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileObject = {};
            if (req.files.media) {
                const mediaUrl = req.files.media[0].path.replace(/\\/g, "/");
                fileObject.media = mediaUrl;
            }
            var insert = Object.assign(Object.assign({}, req.body), fileObject);
            try {
                let work = yield new Work_1.default(insert).save();
                res.json({
                    message: 'Work Save Successfully',
                    data: work,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static all(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const work = yield Work_1.default.find();
                const data = {
                    message: 'Success',
                    data: work
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static content(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const work_content = yield Admin_1.default.findOne({ status: true }, { homepage_work_content: 1 });
                const data = {
                    message: 'Success',
                    data: work_content
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
            const work = req.work;
            try {
                yield work.remove();
                res.json({
                    message: 'Success ! Work Deleted Successfully',
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
            const WorkId = req.work._id;
            let fileObject = {};
            if (req.files.media) {
                const mediaUrl = req.files.media[0].path.replace(/\\/g, "/");
                fileObject.media = mediaUrl;
            }
            var update = Object.assign(Object.assign(Object.assign({}, req.body), fileObject), { updated_at: new Date() });
            try {
                const work = yield Work_1.default.findOneAndUpdate({ _id: WorkId }, update, { new: true, useFindAndModify: false });
                res.send(work);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.WorkController = WorkController;
