import { body, param, query } from "express-validator";

import TalentCategory from "../../models/TalentCategory";

export class TalentCategoryValidators{

    static create(){

        return  [ 
                    body('category', 'Audio Category Name Is Required').custom((category, {req})=>{
                        return  TalentCategory.findOne({category:category}).then(talentCategory => {
                                    if(talentCategory){
                                        throw new Error('Audio Category Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    })
    
                ];
        
    }

    static category() {
        return [param('id').custom((id, {req}) => {
            return TalentCategory.findOne({_id: id}, {__v: 0}).then((talentCategory) => {
                if (talentCategory) {
                    req.talentCategory = talentCategory;
                    return true;
                } else {
                    throw new Error('Talent Category Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return TalentCategory.findOne({_id: id}, {__v: 0}).then((talentCategory) => {
                if (talentCategory) {
                    req.talentCategory = talentCategory;
                    return true;
                } else {
                    throw new Error('Talent Category Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return TalentCategory.findOne({_id: id}, {__v: 0}).then((talentCategory) => {
                if (talentCategory) {
                    req.talentCategory = talentCategory;
                    return true;
                } else {
                    throw new Error('Talent Category Does Not Exist');
                }
            })
        })]
    }


}