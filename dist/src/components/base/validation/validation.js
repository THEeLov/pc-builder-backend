"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentCreate = exports.component = exports.PriceQuery = void 0;
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
const componentType = zod_1.default.enum(Object.values(client_1.ComponentType));
const priceSchema = zod_1.default.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num);
}, {
    message: "Must be a valid number",
});
exports.PriceQuery = zod_1.default.object({
    minPrice: priceSchema.optional(),
    maxPrice: priceSchema.optional(),
});
exports.component = zod_1.default.object({
    id: zod_1.default.string().uuid(),
    name: zod_1.default.string(),
    componentType: componentType,
    price: zod_1.default.number(),
    manufacturer: zod_1.default.string(),
    imageUrl: zod_1.default.string(),
});
exports.componentCreate = zod_1.default.object({
    name: zod_1.default.string(),
    componentType: componentType,
    price: zod_1.default.number(),
    manufacturer: zod_1.default.string(),
    imageUrl: zod_1.default.string(),
});
