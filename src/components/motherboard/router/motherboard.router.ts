import express from "express"
import MotherboardController from "../controller/motherboard.controller"
import upload from "../../uploadService"

const router = express.Router()

router.route("/").post(upload.single("image"), MotherboardController.create).get(MotherboardController.getMany)

router
    .route("/:id")
    .put(MotherboardController.update)
    .get(MotherboardController.getSingle)
    .delete(MotherboardController.remove)

export default router
