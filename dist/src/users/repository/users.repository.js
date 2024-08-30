"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const client_1 = require("../../client");
const utils_1 = __importDefault(require("../../utils"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const result_1 = require("@badrap/result");
const saltRounds = 10;
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.hash(password, saltRounds);
    });
}
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashed = yield hashPassword(data.password);
            const newUser = yield client_1.prisma.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    password: hashed,
                    userType: data.userRole,
                },
            });
            return result_1.Result.ok(newUser);
        }
        catch (error) {
            console.log(error);
            return (0, utils_1.default)(error, "in user create");
        }
    });
}
function update(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield client_1.prisma.user.update({
                where: {
                    id: id,
                },
                data: data,
                include: {
                    userconfigurations: true,
                    partialUserConfiguration: true,
                },
            });
            return result_1.Result.ok(user);
        }
        catch (error) {
            return (0, utils_1.default)(error, "in update user");
        }
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.prisma.user.delete({
                where: {
                    id: id,
                },
            });
            return result_1.Result.ok(undefined);
        }
        catch (error) {
            return (0, utils_1.default)(error, "in user remove");
        }
    });
}
function getByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield client_1.prisma.user.findUniqueOrThrow({
                where: {
                    email: email,
                },
                include: {
                    userconfigurations: true,
                    partialUserConfiguration: true,
                },
            });
            return result_1.Result.ok(user);
        }
        catch (error) {
            return (0, utils_1.default)(error, "in user getByEmail");
        }
    });
}
function get(identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield client_1.prisma.user.findUniqueOrThrow({
                where: {
                    id: identifier,
                },
                include: {
                    userconfigurations: true,
                    partialUserConfiguration: true,
                },
            });
            return result_1.Result.ok(user);
        }
        catch (error) {
            return (0, utils_1.default)(error, "in user get");
        }
    });
}
exports.UsersRepository = {
    create,
    update,
    remove,
    get,
    getByEmail,
};
