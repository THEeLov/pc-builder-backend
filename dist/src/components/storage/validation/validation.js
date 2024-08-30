"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const validation_1 = require("../../base/validation/validation");
const StorageCreate = zod_1.default.object({
    id: zod_1.default.string().uuid().optional(),
    storageType: zod_1.default.string(),
    capacity: zod_1.default.number(),
    busType: zod_1.default.string(),
    component: validation_1.componentCreate,
});
const StorageEdit = zod_1.default.object({
    storageType: zod_1.default.string().optional(),
    capacity: zod_1.default.number().optional(),
    busType: zod_1.default.string().optional(),
});
const StorageSchema = {
    StorageCreate,
    StorageEdit,
};
exports.default = StorageSchema;
