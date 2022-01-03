"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkValidators = void 0;
const express_validator_1 = require("express-validator");
const Work_1 = require("../../models/Work");
class WorkValidators {
    static add() {
        return [
            (0, express_validator_1.body)('title', 'title Is Required'),
        ];
    }
    static update() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Work_1.default.findOne({ _id: id }, { __v: 0 }).then((work) => {
                    if (work) {
                        req.work = work;
                        return true;
                    }
                    else {
                        throw new Error('Work Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Work_1.default.findOne({ _id: id }, { __v: 0 }).then((work) => {
                    if (work) {
                        req.work = work;
                        return true;
                    }
                    else {
                        throw new Error('Work Does Not Exist');
                    }
                });
            })];
    }
}
exports.WorkValidators = WorkValidators;
