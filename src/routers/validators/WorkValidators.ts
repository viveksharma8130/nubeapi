import { body, param, query } from "express-validator";
import Work from "../../models/Work";

export class WorkValidators{

    static add(){

        return  [   
                    body('title', 'title Is Required'),
                ]
        
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Work.findOne({_id: id}, {__v: 0}).then((work) => {
                if (work) {
                    req.work = work;
                    return true;
                } else {
                    throw new Error('Work Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Work.findOne({_id: id}, {__v: 0}).then((work) => {
                if (work) {
                    req.work = work;
                    return true;
                } else {
                    throw new Error('Work Does Not Exist');
                }
            })
        })]
    }

}