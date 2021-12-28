import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const TalentFavouriteSchema = new mongoose.Schema({
    talent_id         : {type: mongoose.Types.ObjectId, ref: 'talents', required: true},
    media_type        : {type: String, enum: ['image','video'], required: false},
    media             : {type: String, required: false},
    link              : {type: String, required: true},
    created_at        : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at        : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

TalentFavouriteSchema.set('toObject', { virtuals: true });
TalentFavouriteSchema.set('toJSON', { virtuals: true });

export default model('talent_portfolios', TalentFavouriteSchema);

