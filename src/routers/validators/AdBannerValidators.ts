import { body, param, query } from "express-validator";

import AdBanner from "../../models/AdBanner";

export class AdBannerValidators{

    static create(){

        return  [ 
                    body('category', 'Category Name Is Required'),
                    body('respective_id', 'respective_id Is Required'),
    
                ];
        
    }

    static ad() {
        return [param('id').custom((id, {req}) => {
            return AdBanner.findOne({_id: id}, {__v: 0}).then((adBanner) => {
                if (adBanner) {
                    req.adBanner = adBanner;
                    return true;
                } else {
                    throw new Error('Ad Banner Does Not Exist');
                }
            })
        })]
    }

    static categoryAd() {
        return [param('category').custom((category, {req}) => {
            return AdBanner.find({category: category}, {__v: 0}).then((adBanner) => {
                if (adBanner) {
                    req.adBanner = adBanner;
                    return true;
                } else {
                    throw new Error('Ad Banner Category Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return AdBanner.findOne({_id: id}, {__v: 0}).then((adBanner) => {
                if (adBanner) {
                    req.adBanner = adBanner;
                    return true;
                } else {
                    throw new Error('Ad Banner Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return AdBanner.findOne({_id: id}, {__v: 0}).then((adBanner) => {
                if (adBanner) {
                    req.adBanner = adBanner;
                    return true;
                } else {
                    throw new Error('Ad Banner Does Not Exist');
                }
            })
        })]
    }


}