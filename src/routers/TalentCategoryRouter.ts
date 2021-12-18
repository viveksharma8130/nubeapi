import { Router } from "express";
import { TalentCategoryController } from "../controllers/TalentCategoryController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { TalentCategoryValidators } from "./validators/TalentCategoryValidators";

class TalentCategoryRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', TalentCategoryValidators.category(), GlobalMiddleWare.checkError, TalentCategoryController.Category);
        this.router.get('/all', TalentCategoryController.AllCategory);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, TalentCategoryController.AllAdminCategory);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, TalentCategoryValidators.create(), GlobalMiddleWare.checkError, TalentCategoryController.Create);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, TalentCategoryValidators.update(), GlobalMiddleWare.checkError, TalentCategoryController.Update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, TalentCategoryValidators.delete(), GlobalMiddleWare.checkError,TalentCategoryController.Delete)
    }
}

export default new TalentCategoryRouter().router;