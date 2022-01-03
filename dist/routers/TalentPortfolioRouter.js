"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TalentPortfolioController_1 = require("../controllers/TalentPortfolioController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const TalentPortfolioValidators_1 = require("./validators/TalentPortfolioValidators");
const Utils_1 = require("../utils/Utils");
class TalentPortfolioRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/talent/:id', TalentPortfolioValidators_1.TalentPortfolioValidators.TalentPortfolio(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TalentPortfolioController_1.TalentPortfolioController.TalentPortfolio);
    }
    postRoutes() {
        this.router.post('/add', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().TalentPortfolioMulter.fields([{ name: 'media' }]), TalentPortfolioValidators_1.TalentPortfolioValidators.add(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TalentPortfolioController_1.TalentPortfolioController.Add);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().TalentPortfolioMulter.fields([{ name: 'media' }]), TalentPortfolioValidators_1.TalentPortfolioValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TalentPortfolioController_1.TalentPortfolioController.Update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, TalentPortfolioValidators_1.TalentPortfolioValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TalentPortfolioController_1.TalentPortfolioController.Delete);
    }
}
exports.default = new TalentPortfolioRouter().router;
