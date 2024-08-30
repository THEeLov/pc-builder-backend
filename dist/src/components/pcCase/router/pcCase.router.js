"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pcCase_controller_1 = __importDefault(require("../controller/pcCase.controller"));
const uploadService_1 = __importDefault(require("../../uploadService"));
const router = express_1.default.Router();
router.route("/").post(uploadService_1.default.single("image"), pcCase_controller_1.default.create).get(pcCase_controller_1.default.getMany);
router.route("/:id").put(pcCase_controller_1.default.update).get(pcCase_controller_1.default.getSingle).delete(pcCase_controller_1.default.remove);
exports.default = router;
