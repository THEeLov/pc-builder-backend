import express from "express"
import cors from "cors"
import { config } from "dotenv"
import { env } from "process"
import cookieParser from "cookie-parser"
import UserRouter from "./users/router/users.router"
import ConfigRouter from "./configurations/configurations.router"
import RAMRouter from "./components/rams/router/rams.router"
import MotherboardRouter from "./components/motherboard/router/motherboard.router"
import ProcessorRouter from "./components/processor/router/processor.router"
import GPURouter from "./components/gpu/router/gpu.router"
import StorageRouter from "./components/storage/router/storage.router"
import PowerSupplyRouter from "./components/powerSupply/router/powerSupply.router"
import PCCaseRouter from "./components/pcCase/router/pcCase.router"
import ImageRouter from "./images/images.router"
import componentRouter from "./components/base/router/components.router"

config()

const app = express()
const port = env.PORT ?? 3000

app.use(cookieParser())

// CORS middleware
app.use(
    cors({
        origin: "https://pc-builder-frontend-psi.vercel.app/",
        credentials: true,
    }),
)

// JSON middleware
app.use(express.json())

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }))

app.use("/components/pc-cases", PCCaseRouter)
app.use("/components/power-supplies", PowerSupplyRouter)
app.use("/components/storages", StorageRouter)
app.use("/components/gpus", GPURouter)
app.use("/components/processors", ProcessorRouter)
app.use("/components/rams", RAMRouter)
app.use("/components/motherboards", MotherboardRouter)
app.use("/components", componentRouter)
app.use("/users", UserRouter)
app.use("/configurations", ConfigRouter)
app.use("/images", ImageRouter)

app.use((_req, res) => {
    res.status(404).send("Not found")
})

if (env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(`[${new Date().toISOString()}] RESTful API is listening on port ${port}`)
    })
}

export default app
