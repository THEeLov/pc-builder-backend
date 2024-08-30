"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const validation_1 = require("../../base/validation/validation");
const ProcessorCreate = zod_1.default.object({
    id: zod_1.default.string().uuid().optional(),
    architecture: zod_1.default.string(),
    cores: zod_1.default.number(),
    threads: zod_1.default.number(),
    bits: zod_1.default.number(),
    socket: zod_1.default.string(),
    component: validation_1.componentCreate,
});
const ProcessorEdit = zod_1.default.object({
    architecture: zod_1.default.string().optional(),
    cores: zod_1.default.number().optional(),
    threads: zod_1.default.number().optional(),
    bits: zod_1.default.number().optional(),
    socket: zod_1.default.string().optional(),
});
const ProcessorSchema = {
    ProcessorCreate,
    ProcessorEdit,
};
exports.default = ProcessorSchema;
