"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rams_controller_1 = require("../controller/rams.controller");
const uploadService_1 = __importDefault(require("../../uploadService"));
const router = express_1.default.Router();
router.route("/").post(uploadService_1.default.single("image"), rams_controller_1.RAMController.create).get(rams_controller_1.RAMController.getMany);
router.route("/:id").put(rams_controller_1.RAMController.update).get(rams_controller_1.RAMController.getSingle).delete(rams_controller_1.RAMController.remove);
exports.default = router;
