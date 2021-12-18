import { Router } from "express";
import { WorkController } from "../controllers/WorkController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { WorkValidators } from "./validators/WorkValidators";
import { Utils } from "../utils/Utils";

class WorkRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/all', WorkController.all);
        this.router.get('/content', WorkController.content);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, new Utils().workMulter.fields([{ name: 'media'}]), WorkValidators.add(), GlobalMiddleWare.checkError, WorkController.Add);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, new Utils().workMulter.fields([{ name: 'media'}]), WorkValidators.update(), GlobalMiddleWare.checkError, WorkController.Update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, WorkValidators.delete(), GlobalMiddleWare.checkError, WorkController.Delete);
    }
}

export default new WorkRouter().router;