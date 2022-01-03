"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WorkController_1 = require("../controllers/WorkController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const WorkValidators_1 = require("./validators/WorkValidators");
const Utils_1 = require("../utils/Utils");
class WorkRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/all', WorkController_1.WorkController.all);
        this.router.get('/content', WorkController_1.WorkController.content);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().workMulter.fields([{ name: 'media' }]), WorkValidators_1.WorkValidators.add(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, WorkController_1.WorkController.Add);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().workMulter.fields([{ name: 'media' }]), WorkValidators_1.WorkValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, WorkController_1.WorkController.Update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, WorkValidators_1.WorkValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, WorkController_1.WorkController.Delete);
    }
}
exports.default = new WorkRouter().router;
