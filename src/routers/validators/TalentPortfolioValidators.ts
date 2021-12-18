import { body, param, query } from "express-validator";
import TalentPortfolio from "../../models/TalentPortfolio";
import Talent from "../../models/Talent";

export class TalentPortfolioValidators{

    static add(){

        return  [   
                    body('talent_id', 'Talent_id Is Required').isAlphanumeric().custom((talent_id, {req})=>{
                        return  Talent.findOne({_id:talent_id}).then(talent => { 
                                    if(talent){
                                        return true;
                                    }else{
                                        throw new Error('post Not Exist');
                                    }
                                })
                    }),
                    body('media_type', 'media_type Is Required')
                ]
        
    }

    static TalentPortfolio() {
        return [param('id').custom((id, {req}) => {
            return TalentPortfolio.find({talent_id: id}, {__v: 0}).populate({path:'talent_id'}).then((talentPortfolio) => {
                if (talentPortfolio) {
                    req.talentPortfolio = talentPortfolio;
                    return true;
                } else {
                    throw new Error('talentPortfolio Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return TalentPortfolio.findOne({_id: id}, {__v: 0}).then((talentPortfolio) => {
                if (talentPortfolio) {
                    req.talentPortfolio = talentPortfolio;
                    return true;
                } else {
                    throw new Error('talentPortfolio Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return TalentPortfolio.findOne({_id: id}, {__v: 0}).then((talentPortfolio) => {
                if (talentPortfolio) {
                    req.talentPortfolio = talentPortfolio;
                    return true;
                } else {
                    throw new Error('TalentPortfolio Does Not Exist');
                }
            })
        })]
    }

}