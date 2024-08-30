import express from "express"
import StorageController from "../controller/storage.controller"
import upload from "../../uploadService"

const router = express.Router()

router.route("/").post(upload.single("image"), StorageController.create).get(StorageController.getMany)

router.route("/:id").put(StorageController.update).get(StorageController.getSingle).delete(StorageController.remove)

export default router
