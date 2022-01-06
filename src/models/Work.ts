import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const WorkSchema = new mongoose.Schema({
    media             : {type: String, required: true},
    url             : {type: String, required: false},
    title             : {type: String, required: false},
    created_at        : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at        : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

WorkSchema.set('toObject', { virtuals: true });
WorkSchema.set('toJSON', { virtuals: true });

export default model('works', WorkSchema);

