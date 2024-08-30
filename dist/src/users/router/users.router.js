"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controller/users.controller");
const router = express_1.default.Router();
router.route("/register").post(users_controller_1.UsersController.register);
router.route("/login").post(users_controller_1.UsersController.login);
router.route("/logout/:id").post(users_controller_1.UsersController.logout);
router
    .route("/:id")
    .get(users_controller_1.UsersController.getSingle)
    .delete(users_controller_1.UsersController.deleteSingle)
    .put(users_controller_1.UsersController.updateSingle);
exports.default = router;
