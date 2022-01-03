"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const WorkSchema = new mongoose.Schema({
    media: { type: String, required: true },
    title: { type: String, required: false },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
WorkSchema.set('toObject', { virtuals: true });
WorkSchema.set('toJSON', { virtuals: true });
exports.default = (0, mongoose_1.model)('works', WorkSchema);
