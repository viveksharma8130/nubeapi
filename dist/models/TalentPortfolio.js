"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const TalentFavouriteSchema = new mongoose.Schema({
    talent_id: { type: mongoose.Types.ObjectId, ref: 'talents', required: true },
    media_type: { type: String, enum: ['image', 'video'], required: false },
    media: { type: String, required: false },
    link: { type: String, required: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
TalentFavouriteSchema.set('toObject', { virtuals: true });
TalentFavouriteSchema.set('toJSON', { virtuals: true });
exports.default = (0, mongoose_1.model)('talent_portfolios', TalentFavouriteSchema);
