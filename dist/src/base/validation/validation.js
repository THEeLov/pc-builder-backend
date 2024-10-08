"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const IdRequestParams = zod_1.default.object({
    id: zod_1.default.string().uuid(),
});
const cookieSchema = zod_1.default.object({
    sessionId: zod_1.default.string().uuid(),
});
exports.baseValidation = {
    IdRequestParams,
    cookieSchema,
};
