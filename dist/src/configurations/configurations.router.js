"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parcialConfiguration_controller_1 = require("./partial/controller/parcialConfiguration.controller");
const configuration_controller_1 = __importDefault(require("./full/controller/configuration.controller"));
const router = express_1.default.Router();
router
    .route("/partial/:id")
    .get(parcialConfiguration_controller_1.ParcialConfigurationController.get)
    .put(parcialConfiguration_controller_1.ParcialConfigurationController.update)
    .post(parcialConfiguration_controller_1.ParcialConfigurationController.create)
    .delete(parcialConfiguration_controller_1.ParcialConfigurationController.remove);
router.route("/").get(configuration_controller_1.default.getMany);
router
    .route("/:id")
    .put(configuration_controller_1.default.update)
    .post(configuration_controller_1.default.create)
    .delete(configuration_controller_1.default.remove);
exports.default = router;
