"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const baseValidation_1 = require("../../baseValidation");
const configIdSchema = zod_1.default.object({
    configId: zod_1.default.string().uuid(),
});
const createObject = zod_1.default.object({
    configurationType: baseValidation_1.configType,
    motherboardId: zod_1.default.string().uuid(),
    processorId: zod_1.default.string().uuid(),
    gpuId: zod_1.default.string().uuid(),
    powerSupplyId: zod_1.default.string().uuid(),
    PCCaseId: zod_1.default.string().uuid(),
    rams: zod_1.default.array(zod_1.default.object({ id: zod_1.default.string().uuid() })).min(1),
    storages: zod_1.default.array(zod_1.default.object({ id: zod_1.default.string().uuid() })).min(1),
});
const configValidation = {
    configIdSchema,
    createObject,
};
exports.default = configValidation;
