"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdBannerController_1 = require("../controllers/AdBannerController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const AdBannerValidators_1 = require("./validators/AdBannerValidators");
class AdBannerRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', AdBannerValidators_1.AdBannerValidators.ad(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AdBannerController_1.AdBannerController.Ad);
        this.router.get('/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, AdBannerController_1.AdBannerController.AllAd);
        this.router.get('/category/:category', AdBannerValidators_1.AdBannerValidators.categoryAd(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AdBannerController_1.AdBannerController.CategoryAd);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().adBannerMulter.single('banner'), AdBannerValidators_1.AdBannerValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AdBannerController_1.AdBannerController.Create);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().adBannerMulter.single('image'), AdBannerValidators_1.AdBannerValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AdBannerController_1.AdBannerController.Update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, AdBannerValidators_1.AdBannerValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, AdBannerController_1.AdBannerController.Delete);
    }
}
exports.default = new AdBannerRouter().router;
