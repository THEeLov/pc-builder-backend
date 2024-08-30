import express from "express"
import GPUController from "../controller/gpu.controller"
import upload from "../../uploadService"

const router = express.Router()

router.route("/").post(upload.single("image"), GPUController.create).get(GPUController.getMany)

router.route("/:id").put(GPUController.update).get(GPUController.getSingle).delete(GPUController.remove)

export default router
