"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const adBannerSchema = new mongoose.Schema({
    category: { type: String, required: true },
    banner: { type: String, required: true },
    respective_id: { type: mongoose.Types.ObjectId, required: false },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
adBannerSchema.set('toObject', { virtuals: true });
adBannerSchema.set('toJSON', { virtuals: true });
exports.default = (0, mongoose_1.model)('ad_banner', adBannerSchema);
