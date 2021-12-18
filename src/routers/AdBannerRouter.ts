import { Router } from "express";
import { AdBannerController } from "../controllers/AdBannerController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { AdBannerValidators } from "./validators/AdBannerValidators";

class AdBannerRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', AdBannerValidators.ad(), GlobalMiddleWare.checkError, AdBannerController.Ad);
        this.router.get('/all', GlobalMiddleWare.adminAuthenticate, AdBannerController.AllAd);
        this.router.get('/category/:category', AdBannerValidators.categoryAd(), GlobalMiddleWare.checkError, AdBannerController.CategoryAd);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, new Utils().adBannerMulter.single('banner'), AdBannerValidators.create(), GlobalMiddleWare.checkError, AdBannerController.Create);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, new Utils().adBannerMulter.single('image'), AdBannerValidators.update(), GlobalMiddleWare.checkError, AdBannerController.Update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, AdBannerValidators.delete(), GlobalMiddleWare.checkError, AdBannerController.Delete)
    }
}

export default new AdBannerRouter().router;