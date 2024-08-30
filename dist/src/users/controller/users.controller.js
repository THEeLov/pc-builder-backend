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
exports.UsersController = void 0;
const users_repository_1 = require("../repository/users.repository");
const sessions_repository_1 = require("../../sessions/repository/sessions.repository");
const validation_1 = require("../validation/validation");
const utils_1 = require("../../utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const register = validation_1.UserSchema.Register.safeParse(req.body);
        if (!register.success) {
            return res.status(400).json(new Error(register.error.message));
        }
        const result = yield users_repository_1.UsersRepository.create({
            username: register.data.username,
            email: register.data.email,
            password: register.data.password,
        });
        if (result.isErr) {
            return res.status(400).json(result.error);
        }
        if (result.isOk) {
            const session = yield sessions_repository_1.SessionsRepository.create(result.value.id);
            if (!session.isOk) {
                return res.status(400).json(session.isErr ? session.error : new Error("internal error"));
            }
            const formattedExpirationDate = session.value.expiresAt.toUTCString();
            res.set("Access-Control-Allow-Credentials", "true");
            res.set("Set-Cookie", `sessionId=${session.value.id}; Path=/; SameSite=Strict; Expires=${formattedExpirationDate}`);
            return res.status(200).json({
                id: result.value.id,
                username: result.value.username,
                email: result.value.email,
                role: result.value.userType,
            });
        }
        return res.status(500).json(new Error("Internal error"));
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const login = validation_1.UserSchema.Login.safeParse(req.body);
        if (!login.success) {
            return res.status(400).json(new Error(login.error.message));
        }
        const user = yield users_repository_1.UsersRepository.getByEmail(login.data.email);
        if (user.isErr) {
            return res.status(400).json(user.error);
        }
        if (user.isOk) {
            const result = yield bcryptjs_1.default.compare(login.data.password, user.value.password);
            if (result) {
                const session = yield sessions_repository_1.SessionsRepository.create(user.value.id);
                if (!session.isOk) {
                    return res.status(400).json(session.isErr ? session.error : new Error("internal error"));
                }
                const formattedExpirationDate = session.value.expiresAt.toUTCString();
                res.set("Access-Control-Allow-Credentials", "true");
                res.set("Set-Cookie", `sessionId=${session.value.id}; Path=/; SameSite=Strict; Expires=${formattedExpirationDate}`);
                return res.status(200).json({
                    id: user.value.id,
                    username: user.value.username,
                    email: user.value.email,
                    role: user.value.userType,
                });
            }
            else {
                return res.status(400).json(new Error("Invalid credentials"));
            }
        }
        return res.status(500).json(new Error("Internal error"));
    });
}
function getSingle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = validation_1.UserSchema.getParams.safeParse(req.params);
        if (!userId.success) {
            return res.status(400).json(new Error(userId.error.message));
        }
        if (!(yield (0, utils_1.authorize)(userId.data.id, req.cookies.sessionId))) {
            return res.status(401).json(new Error("Unauthorized"));
        }
        const user = yield users_repository_1.UsersRepository.get(userId.data.id);
        if (user.isErr) {
            return res.status(400).json(user.error);
        }
        if (user.isOk) {
            return res.status(200).json({
                id: user.value.id,
                username: user.value.username,
                email: user.value.email,
                role: user.value.userType,
            });
        }
        return res.status(500).json(new Error("Internal error"));
    });
}
function deleteSingle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = validation_1.UserSchema.getParams.safeParse(req.params);
        if (!userId.success) {
            return res.status(400).json(new Error(userId.error.message));
        }
        if (!(yield (0, utils_1.authorize)(userId.data.id, req.cookies.sessionId))) {
            return res.status(401).json(new Error("Unauthorized"));
        }
        const user = yield users_repository_1.UsersRepository.remove(userId.data.id);
        if (user.isErr) {
            return res.status(400).json(user.error);
        }
        if (user.isOk) {
            return res.status(200).json("Success!");
        }
        return res.status(500).json(new Error("Internal error"));
    });
}
function updateSingle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateParams = validation_1.UserSchema.Edit.safeParse(req.body);
        if (!updateParams.success) {
            return res.status(400).json(new Error(updateParams.error.message));
        }
        const userId = validation_1.UserSchema.getParams.safeParse(req.params);
        if (!userId.success) {
            return res.status(400).json(new Error(userId.error.message));
        }
        if (!(yield (0, utils_1.authorize)(userId.data.id, req.cookies.sessionId))) {
            return res.status(401).json(new Error("Unauthorized"));
        }
        const user = yield users_repository_1.UsersRepository.update(userId.data.id, updateParams.data);
        if (user.isErr) {
            return res.status(400).json(user.error);
        }
        if (user.isOk) {
            return res.status(200).json(user.value);
        }
        return res.status(500).json(new Error("Internal error"));
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = validation_1.UserSchema.getParams.safeParse(req.body);
        if (!params.success || !(yield (0, utils_1.authorize)(params.data.id, req.cookies.sessionId))) {
            return res.status(401).json();
        }
        res.set("Access-Control-Allow-Credentials", "true");
        res.set("Set-Cookie", "session=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT");
        sessions_repository_1.SessionsRepository.remove(req.cookies.sessionId);
        return res.status(200).json();
    });
}
exports.UsersController = {
    register,
    login,
    logout,
    getSingle,
    deleteSingle,
    updateSingle,
};
