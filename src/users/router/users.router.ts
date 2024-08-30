import express from "express"
import { UsersController } from "../controller/users.controller"

const router = express.Router()

router.route("/register").post(UsersController.register)
router.route("/login").post(UsersController.login)
router.route("/logout/:id").post(UsersController.logout)
router
    .route("/:id")
    .get(UsersController.getSingle)
    .delete(UsersController.deleteSingle)
    .put(UsersController.updateSingle)

export default router
