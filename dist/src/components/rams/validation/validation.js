"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RamEdit = exports.RamCreate = void 0;
const zod_1 = __importDefault(require("zod"));
const validation_1 = require("../../base/validation/validation");
const client_1 = require("@prisma/client");
const computerType = zod_1.default.enum(Object.values(client_1.ComputerType));
exports.RamCreate = zod_1.default.object({
    id: zod_1.default.string().uuid().optional(),
    component: validation_1.componentCreate,
    memoryType: zod_1.default.string(),
    capacity: zod_1.default.number(),
    computerType: computerType,
});
exports.RamEdit = zod_1.default.object({
    memoryType: zod_1.default.string().optional(),
    capacity: zod_1.default.number().optional(),
    computerType: computerType.optional(),
});
const RamSchema = {
    RamCreate: exports.RamCreate,
    RamEdit: exports.RamEdit,
};
exports.default = RamSchema;
