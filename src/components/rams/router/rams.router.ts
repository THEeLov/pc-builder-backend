import express from "express"
import { RAMController } from "../controller/rams.controller"
import upload from "../../uploadService"

const router = express.Router()

router.route("/").post(upload.single("image"), RAMController.create).get(RAMController.getMany)

router.route("/:id").put(RAMController.update).get(RAMController.getSingle).delete(RAMController.remove)

export default router
