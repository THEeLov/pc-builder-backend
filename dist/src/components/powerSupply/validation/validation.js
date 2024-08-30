"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const validation_1 = require("../../base/validation/validation");
const PowerSupplyCreate = zod_1.default.object({
    id: zod_1.default.string().uuid().optional(),
    powerOutput: zod_1.default.number(),
    efficiency: zod_1.default.string(),
    formFactor: zod_1.default.string(),
    component: validation_1.componentCreate,
});
const PowerSupplyEdit = zod_1.default.object({
    powerOutput: zod_1.default.number().optional(),
    efficiency: zod_1.default.string().optional(),
    formFactor: zod_1.default.string().optional(),
});
const PowerSupplySchema = {
    PowerSupplyCreate,
    PowerSupplyEdit,
};
exports.default = PowerSupplySchema;
