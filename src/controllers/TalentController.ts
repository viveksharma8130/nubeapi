import Talent from "../models/Talent";
import * as fs from 'fs';

export class TalentController {

    static async Create(req, res, next){  

        let fileObject:any = {};
        if(req.files.image){
            const imageUrl:any = req.files.image[0].path.replace(/\\/g, "/");
            fileObject.image=imageUrl;
        }
        if(req.files.home_image){
            const home_imageUrl:any = req.files.home_image[0].path.replace(/\\/g, "/");
            fileObject.home_image=home_imageUrl;
        }

        var insert = {...req.body, ...fileObject}; 

        try {

            let talent:any = await new Talent(insert).save();
            res.json({
                message:'Talent Save Successfully',
                data:talent,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async Talent(req, res, next){
        const talent = req.talent;
        const data = {
            message : 'Success',
            data:talent
        };
        res.json(data);
    }

    static async TalentCategory(req, res, next){

        try {
            const talent = await Talent.find({talent_category_id:req.talent_category._id}, {__v: 0});
            const data = {
                message : 'Success',
                category : req.talent_category,
                data:talent
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async All(req, res, next){

        try {
            if(req.query.limit){
                console.log(req.query.limit);
                var talent = await Talent.find({status:true}, {name: 1, home_image:1, slug:1}).limit(parseInt(req.query.limit)).sort({sequence:1});
            }else{
                var talent = await Talent.find({status:true}, {name: 1, home_image:1, slug:1}).sort({sequence:1});
            }
            
            const data = {
                message : 'Success',
                data:talent
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async adminAll(req, res, next){

        try {
            const talent = await Talent.find({}, {__v: 0}).sort({sequence:1}).populate({path:'talent_category_id'});
            const data = {
                message : 'Success',
                data:talent
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async Delete(req, res, next) {
        const talent = req.talent;
        try {
            await fs.unlink(talent['image'], async (err) => {
                if (err) throw err;
            });
            await fs.unlink(talent['home_image'], async (err) => {
                if (err) throw err;
            });
            await talent.remove();
            res.json({
                message:'Success ! Talent Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

    static async Update(req, res, next) {
        const talentId = req.talent._id;

        let fileObject:any = {};
        if(req.files.image){
            const imageUrl:any = req.files.image[0].path.replace(/\\/g, "/");
            fileObject.image=imageUrl;
        }
        if(req.files.home_image){
            const home_imageUrl:any = req.files.home_image[0].path.replace(/\\/g, "/");
            fileObject.home_image=home_imageUrl;
        }

        var update = {...req.body, ...fileObject, updated_at: new Date()}; 

        try {
            const talent = await Talent.findOneAndUpdate({_id: talentId}, update, {new: true, useFindAndModify: false});
            res.send(talent);
        } catch (e) {
            next(e);
        }

    }

} 