"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const process_1 = require("process");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_router_1 = __importDefault(require("./users/router/users.router"));
const configurations_router_1 = __importDefault(require("./configurations/configurations.router"));
const rams_router_1 = __importDefault(require("./components/rams/router/rams.router"));
const motherboard_router_1 = __importDefault(require("./components/motherboard/router/motherboard.router"));
const processor_router_1 = __importDefault(require("./components/processor/router/processor.router"));
const gpu_router_1 = __importDefault(require("./components/gpu/router/gpu.router"));
const storage_router_1 = __importDefault(require("./components/storage/router/storage.router"));
const powerSupply_router_1 = __importDefault(require("./components/powerSupply/router/powerSupply.router"));
const pcCase_router_1 = __importDefault(require("./components/pcCase/router/pcCase.router"));
const images_router_1 = __importDefault(require("./images/images.router"));
const components_router_1 = __importDefault(require("./components/base/router/components.router"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = (_a = process_1.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.use((0, cookie_parser_1.default)());
// CORS middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:4200",
    credentials: true,
}));
// JSON middleware
app.use(express_1.default.json());
// parse URL encoded strings
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/components/pc-cases", pcCase_router_1.default);
app.use("/components/power-supplies", powerSupply_router_1.default);
app.use("/components/storages", storage_router_1.default);
app.use("/components/gpus", gpu_router_1.default);
app.use("/components/processors", processor_router_1.default);
app.use("/components/rams", rams_router_1.default);
app.use("/components/motherboards", motherboard_router_1.default);
app.use("/components", components_router_1.default);
app.use("/users", users_router_1.default);
app.use("/configurations", configurations_router_1.default);
app.use("/images", images_router_1.default);
app.use((_req, res) => {
    res.status(404).send("Not found");
});
if (process_1.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(`[${new Date().toISOString()}] RESTful API  is listening on port ${port}`);
    });
}
