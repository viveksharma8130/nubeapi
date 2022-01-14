import TalentCategory from "../models/TalentCategory";
import * as fs from 'fs';
import { Populate } from "../utils/Populate";

export class TalentCategoryController {

    static async Create(req, res, next){  

        try {
            let talentCategory:any = await new TalentCategory(req.body).save();
            res.json({
                message:'Talent Category Save Successfully',
                data:talentCategory,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async Update(req, res, next) {
        const talentCategoryId = req.talentCategory._id;
        try {
            const talentCategory = await TalentCategory.findOneAndUpdate({_id: talentCategoryId}, req.body, {new: true, useFindAndModify: false});
            res.send(talentCategory);
        } catch (e) {
            next(e);
        }

    }

    static async Category(req, res, next){
        const talentCategory = req.talentCategory;
        const data = {
            message : 'Success',
            data:talentCategory
        };
        res.json(data);
    }

    static async AllCategory(req, res, next){

        try {
            const talentCategory = await TalentCategory.find({status:true}, {category:1}).sort({sequence:1}).populate({path:'talents', select:['slug', 'name', 'image','-talent_category_id'], options: { sort: { 'sequence_category': 1 } } });
            const data = {
                message : 'Success',
                data:talentCategory
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async AllAdminCategory(req, res, next){

        try {
            const talentCategory = await TalentCategory.find().sort({sequence:1}).populate({path:'talents', select:['slug', 'name', 'image','-talent_category_id'], options: { sort: { 'sequence_category': 1 } } });
            const data = {
                message : 'Success',
                data:talentCategory
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async Delete(req, res, next) {
        const talentCategory = req.talentCategory;
        try {
            await talentCategory.remove();
            res.json({
                message:'Success ! Talent Category Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

} 