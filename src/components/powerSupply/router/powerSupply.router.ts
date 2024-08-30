import express from "express"
import PowerSupplyController from "../controller/powerSupply.controller"
import upload from "../../uploadService"

const router = express.Router()

router.route("/").post(upload.single("image"), PowerSupplyController.create).get(PowerSupplyController.getMany)

router
    .route("/:id")
    .put(PowerSupplyController.update)
    .get(PowerSupplyController.getSingle)
    .delete(PowerSupplyController.remove)

export default router
