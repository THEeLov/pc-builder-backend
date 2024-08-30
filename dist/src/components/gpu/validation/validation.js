"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const validation_1 = require("../../base/validation/validation");
const GPUCreate = zod_1.default.object({
    id: zod_1.default.string().uuid().optional(),
    memory: zod_1.default.number(),
    powerConnector: zod_1.default.string(),
    interface: zod_1.default.string(),
    power: zod_1.default.number(),
    component: validation_1.componentCreate,
});
const GPUEdit = zod_1.default.object({
    memory: zod_1.default.number().optional(),
    powerConnector: zod_1.default.string().optional(),
    interface: zod_1.default.string().optional(),
    power: zod_1.default.number().optional(),
});
const GPUSchema = {
    GPUCreate,
    GPUEdit,
};
exports.default = GPUSchema;
