import TalentPortfolio from "../models/TalentPortfolio";

import * as fs from 'fs';

export class TalentPortfolioController {

    static async Add(req, res, next){  
        let fileObject:any = {};
        if(req.files.media){
            const mediaUrl:any = req.files.media[0].path.replace(/\\/g, "/");
            fileObject.media=mediaUrl;
        }

        var insert = {...req.body, ...fileObject}; 

        try {

            let talentPortfolio:any = await new TalentPortfolio(insert).save();
            res.json({
                message:'TalentPortfolio Save Successfully',
                data:talentPortfolio,
                status_code:200
            });

        } catch (e) {
            next(e)
        }

   
    }

    static async TalentPortfolio(req, res, next){
        const talentPortfolio = req.talentPortfolio;
        const data = {
            message : 'Success',
            data:talentPortfolio
        };
        res.json(data);
    }

    static async All(req, res, next){
        try {
            const talentPortfolio = await TalentPortfolio.find().populate({path:'talent_id'});
            const data = {
                message : 'Success',
                data:talentPortfolio
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async Delete(req, res, next) {
        const talentPortfolio = req.talentPortfolio;
        try {
            await fs.unlink(talentPortfolio['media'], async (err) => {
                if (err) throw err;
            });
            await talentPortfolio.remove();
            res.json({
                message:'Success ! TalentPortfolio Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

    static async Update(req, res, next) {
        const talentPortfolioId = req.talentPortfolio._id;

        let fileObject:any = {};
        if(req.files.media){
            const mediaUrl:any = req.files.media[0].path.replace(/\\/g, "/");
            fileObject.media=mediaUrl;
        }

        var update = {...req.body, ...fileObject, updated_at: new Date()}; 

        try {
            const talentPortfolio = await TalentPortfolio.findOneAndUpdate({_id: talentPortfolioId}, update, {new: true, useFindAndModify: false});
            res.send(talentPortfolio);
        } catch (e) {
            next(e);
        }

    }

} 