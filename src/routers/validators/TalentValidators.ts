import { body, param, query } from "express-validator";
import Talent from "../../models/Talent";
import TalentCategory from "../../models/TalentCategory";

export class TalentValidators{

    static create(){

        return  [   body('talent_category_id', 'Talent Category Is Required').isAlphanumeric().custom((talent_category_id, {req})=>{
                        return  TalentCategory.findOne({_id:talent_category_id}).then(talent_category => { 
                                    if(talent_category){
                                        return true;
                                    }else{
                                        throw new Error('Talent Category Not Exist');
                                    }
                                })
                    }),
                    body('name', 'name is Required').isString(),
                    body('slug', 'slug is Required').isString(),
                    body('designation', 'description is Required').isString(),
                    body('about', 'about is Required').isString(),
                    body('content', 'content is Required').isString(),
                    body('contact_name', 'contact_name is Required').isString(),
                    body('contact_email', 'contact_email is Required').isString(),
                ]
        
    }

    static Talent() { 
        return [param('slug').custom((slug, {req}) => {
            return Talent.findOne({slug: slug}, {__v: 0}).populate([{ path: "talent_category_id"},{ path: "portfolios"}]).then((talent) => {
                if (talent) {
                    req.talent = talent;
                    return true;
                } else {
                    throw new Error('Talent Does Not Exist');
                }
            })
        })]
    }

    static Talent_category() {
        return [param('id').custom((id, {req}) => {
            return TalentCategory.findOne({_id: id}, {__v: 0}).then((talent_category) => {
                if (talent_category) {
                    req.talent_category = talent_category;
                    return true;
                } else {
                    throw new Error('Talent Category Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Talent.findOne({_id: id}, {__v: 0}).then((talent) => {
                if (talent) {
                    req.talent = talent;
                    return true;
                } else {
                    throw new Error('Talent Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Talent.findOne({_id: id}, {__v: 0}).then((talent) => {
                if (talent) {
                    req.talent = talent;
                    return true;
                } else {
                    throw new Error('Talent Does Not Exist');
                }
            })
        })]
    }


}