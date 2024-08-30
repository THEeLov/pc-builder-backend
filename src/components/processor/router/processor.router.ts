import express from "express"
import ProcessorController from "../controller/processor.controller"
import upload from "../../uploadService"

const router = express.Router()

router.route("/").post(upload.single("image"), ProcessorController.create).get(ProcessorController.getMany)

router
    .route("/:id")
    .put(ProcessorController.update)
    .get(ProcessorController.getSingle)
    .delete(ProcessorController.remove)

export default router
