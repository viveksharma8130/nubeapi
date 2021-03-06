import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const TalentCategorySchema = new mongoose.Schema({
    category                 : {type: String, required: true},
    sequence                 : {type: Number, required: false},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, default: Utils.indianTimeZone},
    updated_at               : {type: Date, default: Utils.indianTimeZone},
},{ id : false });

TalentCategorySchema.set('toObject', { virtuals: true });
TalentCategorySchema.set('toJSON', { virtuals: true });

TalentCategorySchema.virtual('talents', {   
    ref: 'talents', 
    localField: '_id',
    foreignField: 'talent_category_id',
});

export default model('talent_categorys', TalentCategorySchema);

    