"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const Register = zod_1.default.object({
    username: zod_1.default.string().min(3).max(40),
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
const Login = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
const getParams = zod_1.default.object({
    id: zod_1.default.string().uuid(),
});
const Edit = zod_1.default.object({
    username: zod_1.default.string().min(3).max(40).optional(),
    email: zod_1.default.string().email().optional(),
    password: zod_1.default.string().optional(),
});
exports.UserSchema = {
    Register,
    Login,
    getParams,
    Edit,
};
