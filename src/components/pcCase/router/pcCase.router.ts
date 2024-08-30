import express from "express"
import PCCaseController from "../controller/pcCase.controller"
import upload from "../../uploadService"

const router = express.Router()

router.route("/").post(upload.single("image"), PCCaseController.create).get(PCCaseController.getMany)

router.route("/:id").put(PCCaseController.update).get(PCCaseController.getSingle).delete(PCCaseController.remove)

export default router
