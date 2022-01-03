"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TalentController_1 = require("../controllers/TalentController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const TalentValidators_1 = require("./validators/TalentValidators");
class TalentRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/member/:slug', TalentValidators_1.TalentValidators.Talent(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TalentController_1.TalentController.Talent);
        this.router.get('/all', TalentController_1.TalentController.All);
        // API
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, TalentController_1.TalentController.adminAll);
        this.router.get('/talent_category/:id', TalentValidators_1.TalentValidators.Talent_category(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TalentController_1.TalentController.TalentCategory);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().TalentMulter.fields([{ name: 'image' }, { name: 'home_image' }]), TalentValidators_1.TalentValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TalentController_1.TalentController.Create);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().TalentMulter.fields([{ name: 'image' }, { name: 'home_image' }]), TalentValidators_1.TalentValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TalentController_1.TalentController.Update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, TalentValidators_1.TalentValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, TalentController_1.TalentController.Delete);
    }
}
exports.default = new TalentRouter().router;
