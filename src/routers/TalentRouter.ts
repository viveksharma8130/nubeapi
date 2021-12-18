import { Router } from "express";
import { TalentController } from "../controllers/TalentController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { TalentValidators } from "./validators/TalentValidators";

class TalentRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', TalentValidators.Talent(), GlobalMiddleWare.checkError, TalentController.Talent);
        this.router.get('/all', TalentController.All);

        // API
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, TalentController.adminAll);
        this.router.get('/talent_category/:id', TalentValidators.Talent_category(), GlobalMiddleWare.checkError, TalentController.TalentCategory);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, new Utils().TalentMulter.fields([{ name: 'image'},{ name: 'home_image'}]), TalentValidators.create(), GlobalMiddleWare.checkError, TalentController.Create);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, new Utils().TalentMulter.fields([{ name: 'image'},{ name: 'home_image'}]), TalentValidators.update(), GlobalMiddleWare.checkError, TalentController.Update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, TalentValidators.delete(), GlobalMiddleWare.checkError,TalentController.Delete)
    }
}

export default new TalentRouter().router;