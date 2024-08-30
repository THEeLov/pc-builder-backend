import { Router } from "express"
import get from "./controller"

const router = Router()

router.route("/:url").get(get)

export default router
