import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const TalentSchema = new mongoose.Schema({
    talent_category_id       : {type: mongoose.Types.ObjectId, required: true, ref: 'talent_categorys'},
    name                     : {type: String, required: true},
    slug                     : {type: String, required: true},
    designation              : {type: String, required: true},
    about                    : {type: String, required: true},
    portfolio_link           : {type: String, required: false},
    vimeo                    : {type: String, required: false},
    instagram                : {type: String, required: false},
    linkedin                 : {type: String, required: false},
    content                  : {type: String, required: true},
    contact_name             : {type: String, required: true},
    contact_email            : {type: String, required: true},
    image                    : {type: String, required: true},
    home_image               : {type: String, required: true},
    sequence                 : {type: Number, required: false},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

TalentSchema.set('toObject', { virtuals: true });
TalentSchema.set('toJSON', { virtuals: true });

TalentSchema.virtual('portfolios', {   
    ref: 'talent_portfolios', 
    localField: '_id',
    foreignField: 'talent_id',
    //justOne: true
    //count: true
});

export default model('talents', TalentSchema);

