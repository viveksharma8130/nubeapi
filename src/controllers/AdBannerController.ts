import AdBanner from "../models/AdBanner";

export class AdBannerController {

    static async Create(req, res, next){  

        const category = req.body.category;
        const respective_id = req.body.respective_id;

        try {
            const data ={
                category: category,
                respective_id: respective_id,
            }

            let fileObject:any = {};
            if(req.file){
                const postUrl:any = req.file.path.replace(/\\/g, "/"); 
                fileObject.banner=postUrl;
            }

            var insert = {...fileObject, ...data}; 

            let adBanner:any = await new AdBanner(insert).save();
            res.json({
                message:'Category Save Successfully',
                data:adBanner,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
   
    }

    static async Update(req, res, next) {
        const AdBannerId = req.AdBanner._id;
        try {

            let fileObject:any = {};
            if(req.file){
                const postUrl:any = req.file.path.replace(/\\/g, "/"); 
                fileObject.banner=postUrl;
            }

            var insert = {...fileObject, ...req.body}; 

            const adBanner = await AdBanner.findOneAndUpdate({_id: AdBannerId}, insert, {new: true, useFindAndModify: false});
            res.send(adBanner);
        } catch (e) {
            next(e);
        }

    }

    static async Ad(req, res, next){
        const adBanner = req.adBanner;
        const data = {
            message : 'Success',
            data:adBanner
        };
        res.json(data);
    }

    static async CategoryAd(req, res, next){
        const adBanner = req.adBanner;
        const data = {
            message : 'Success',
            data:adBanner
        };
        res.json(data);
    }

    static async AllAd(req, res, next){
        try {
            const adBanner = await AdBanner.find({status:true}, {__v: 0});
            const data = {
                message : 'Success',
                data:adBanner
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async Delete(req, res, next) {
        const adBanner = req.adBanner;
        try {
            await adBanner.remove();
            res.json({
                message:'Success ! AdBanner Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

} 