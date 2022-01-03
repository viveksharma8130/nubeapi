"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TalentCategoryController_1 = require("../controllers/TalentCategoryController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const TalentCategoryValidators_1 = require("./validators/TalentCategoryValidators");
class TalentCategoryRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', TalentCategoryValidators_1.TalentCategoryValidators.category(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TalentCategoryController_1.TalentCategoryController.Category);
        this.router.get('/all', TalentCategoryController_1.TalentCategoryController.AllCategory);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, TalentCategoryController_1.TalentCategoryController.AllAdminCategory);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, TalentCategoryValidators_1.TalentCategoryValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TalentCategoryController_1.TalentCategoryController.Create);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, TalentCategoryValidators_1.TalentCategoryValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TalentCategoryController_1.TalentCategoryController.Update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, TalentCategoryValidators_1.TalentCategoryValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TalentCategoryController_1.TalentCategoryController.Delete);
    }
}
exports.default = new TalentCategoryRouter().router;
