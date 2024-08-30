import express from "express"
import { getMany, remove } from "../controller/just.components.controller"

const componentRouter = express.Router()

componentRouter.route("/:id").delete(remove)

componentRouter.route("/").get(getMany)

export default componentRouter
