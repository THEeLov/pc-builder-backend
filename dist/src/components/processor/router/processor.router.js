"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const processor_controller_1 = __importDefault(require("../controller/processor.controller"));
const uploadService_1 = __importDefault(require("../../uploadService"));
const router = express_1.default.Router();
router.route("/").post(uploadService_1.default.single("image"), processor_controller_1.default.create).get(processor_controller_1.default.getMany);
router
    .route("/:id")
    .put(processor_controller_1.default.update)
    .get(processor_controller_1.default.getSingle)
    .delete(processor_controller_1.default.remove);
exports.default = router;
