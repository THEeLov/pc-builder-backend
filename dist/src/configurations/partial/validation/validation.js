"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcialConfigSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const baseValidation_1 = require("../../baseValidation");
const createObject = zod_1.default.object({
    configurationType: baseValidation_1.configType,
    motherboardId: zod_1.default.string().uuid().optional(),
    processorId: zod_1.default.string().uuid().optional(),
    gpuId: zod_1.default.string().uuid().optional(),
    powerSupplyId: zod_1.default.string().uuid().optional(),
    PCCaseId: zod_1.default.string().uuid().optional(),
    ramId: zod_1.default.string().uuid().optional(),
    storageId: zod_1.default.string().uuid().optional(),
});
const fullUpdateObject = zod_1.default.object({
    configurationType: baseValidation_1.configType.optional(),
    motherboardId: zod_1.default.string().uuid().optional(),
    processorId: zod_1.default.string().uuid().optional(),
    gpuId: zod_1.default.string().uuid().optional(),
    powerSupplyId: zod_1.default.string().uuid().optional(),
    PCCaseId: zod_1.default.string().uuid().optional(),
    rams: zod_1.default.array(zod_1.default.object({ id: zod_1.default.string() })).optional(),
    storages: zod_1.default.array(zod_1.default.object({ id: zod_1.default.string() })).optional(),
});
const updateObject = zod_1.default.object({
    delete: zod_1.default.boolean(),
    configurationType: baseValidation_1.configType.optional(),
    motherboardId: zod_1.default.string().uuid().optional().nullable(),
    processorId: zod_1.default.string().uuid().optional().nullable(),
    gpuId: zod_1.default.string().uuid().optional().nullable(),
    powerSupplyId: zod_1.default.string().uuid().optional().nullable(),
    PCCaseId: zod_1.default.string().uuid().optional().nullable(),
    ramId: zod_1.default.string().uuid().optional(),
    storageId: zod_1.default.string().uuid().optional(),
});
exports.parcialConfigSchema = {
    updateObject,
    createObject,
    fullUpdateObject,
};
