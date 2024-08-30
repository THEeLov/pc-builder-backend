"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const validation_1 = require("../../base/validation/validation");
const PCCaseCreate = zod_1.default.object({
    id: zod_1.default.string().uuid().optional(),
    formFactor: zod_1.default.string(),
    component: validation_1.componentCreate,
});
const PCCaseEdit = zod_1.default.object({
    formFactor: zod_1.default.string().optional(),
});
const PCCaseSchema = {
    PCCaseCreate,
    PCCaseEdit,
};
exports.default = PCCaseSchema;
