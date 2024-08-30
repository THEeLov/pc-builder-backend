"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const just_components_controller_1 = require("../controller/just.components.controller");
const componentRouter = express_1.default.Router();
componentRouter.route("/:id").delete(just_components_controller_1.remove);
componentRouter.route("/").get(just_components_controller_1.getMany);
exports.default = componentRouter;
