import Work from "../models/Work";
import * as fs from 'fs';
import Admin from "../models/Admin";

export class WorkController {

    static async Add(req, res, next){  
        let fileObject:any = {};
        if(req.files.media){
            const mediaUrl:any = req.files.media[0].path.replace(/\\/g, "/");
            fileObject.media=mediaUrl;
        }

        var insert = {...req.body, ...fileObject}; 

        try {

            let work:any = await new Work(insert).save();
            res.json({
                message:'Work Save Successfully',
                data:work,
                status_code:200
            });

        } catch (e) {
            next(e)
        }

   
    }

    static async all(req, res, next){

        try {
            const work = await Work.find();
            const data = {
                message : 'Success',
                data:work
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async content(req, res, next){

        try {
            const work_content = await Admin.findOne({status:true}, {homepage_work_content: 1});
            const data = {
                message : 'Success',
                data:work_content
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async Delete(req, res, next) {
        const work = req.work;
        try {
            await work.remove();
            res.json({
                message:'Success ! Work Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

    static async Update(req, res, next) {
        const WorkId = req.work._id;

        let fileObject:any = {};
        if(req.files.media){
            const mediaUrl:any = req.files.media[0].path.replace(/\\/g, "/");
            fileObject.media=mediaUrl;
        }

        var update = {...req.body, ...fileObject, updated_at: new Date()}; 

        try {
            const work = await Work.findOneAndUpdate({_id: WorkId}, update, {new: true, useFindAndModify: false});
            res.send(work);
        } catch (e) {
            next(e);
        }

    }

} 