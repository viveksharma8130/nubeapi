import { Router } from "express";
import { TalentPortfolioController } from "../controllers/TalentPortfolioController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { TalentPortfolioValidators } from "./validators/TalentPortfolioValidators";
import { Utils } from "../utils/Utils";

class TalentPortfolioRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/talent/:id', TalentPortfolioValidators.TalentPortfolio(), GlobalMiddleWare.checkError, TalentPortfolioController.TalentPortfolio);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, new Utils().TalentPortfolioMulter.fields([{ name: 'media'}]), TalentPortfolioValidators.add(), GlobalMiddleWare.checkError, TalentPortfolioController.Add);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, new Utils().TalentPortfolioMulter.fields([{ name: 'media'}]), TalentPortfolioValidators.update(), GlobalMiddleWare.checkError, TalentPortfolioController.Update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, TalentPortfolioValidators.delete(), GlobalMiddleWare.checkError, TalentPortfolioController.Delete);
    }
}

export default new TalentPortfolioRouter().router;