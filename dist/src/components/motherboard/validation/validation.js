"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const validation_1 = require("../../base/validation/validation");
const MotherboardCreate = zod_1.default.object({
    id: zod_1.default.string().uuid().optional(),
    component: validation_1.componentCreate,
    socket: zod_1.default.string(),
    formFactor: zod_1.default.string(),
    ramSlots: zod_1.default.number(),
    ramType: zod_1.default.string(),
    gpuInterface: zod_1.default.string(),
    storageBusType: zod_1.default.string(),
});
const MotherboardEdit = zod_1.default.object({
    socket: zod_1.default.string().optional(),
    formFactor: zod_1.default.string().optional(),
    ramSlots: zod_1.default.number().optional(),
    ramType: zod_1.default.string().optional(),
    gpuInterface: zod_1.default.string().optional(),
    storageBusType: zod_1.default.string().optional(),
});
const MotherboardSchemas = {
    MotherboardCreate,
    MotherboardEdit,
};
exports.default = MotherboardSchemas;
