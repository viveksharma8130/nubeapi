import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const adBannerSchema = new mongoose.Schema({
    category                 : {type: String, required: true},
    banner                   : {type: String, required: true},
    respective_id            : {type: mongoose.Types.ObjectId, required: false},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

adBannerSchema.set('toObject', { virtuals: true });
adBannerSchema.set('toJSON', { virtuals: true });

export default model('ad_banner', adBannerSchema);

    