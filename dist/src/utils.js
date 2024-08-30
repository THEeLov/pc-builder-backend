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
exports.sessionNotExpired = sessionNotExpired;
exports.authorizeWithConfigId = authorizeWithConfigId;
exports.authorizeAdmin = authorizeAdmin;
exports.authorize = authorize;
const InternalError_1 = __importDefault(require("./errors/InternalError"));
const ConflictError_1 = __importDefault(require("./errors/ConflictError"));
const NotFoundError_1 = __importDefault(require("./errors/NotFoundError"));
const result_1 = require("@badrap/result");
const client_1 = require("@prisma/client");
const sessions_repository_1 = require("./sessions/repository/sessions.repository");
const configuration_repository_1 = __importDefault(require("./configurations/full/repository/configuration.repository"));
const PRISMA_CONFLICT_ERROR = "P2002";
const PRISMA_NOT_FOUND_ERROR = "P2001";
const handleError = (error, message) => {
    if (error.code === PRISMA_CONFLICT_ERROR) {
        return result_1.Result.err(new ConflictError_1.default(message));
    }
    if (error.code === PRISMA_NOT_FOUND_ERROR) {
        return result_1.Result.err(new NotFoundError_1.default(message));
    }
    return result_1.Result.err(new InternalError_1.default());
};
function sessionNotExpired(session) {
    return session.expiresAt > new Date();
}
function authorizeWithConfigId(configId, sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!sessionId) {
            return false;
        }
        const session = yield sessions_repository_1.SessionsRepository.get(sessionId);
        if (session.isErr || session.value.expiresAt > new Date()) {
            return false;
        }
        const config = yield configuration_repository_1.default.get(configId);
        if (config.isErr) {
            return false;
        }
        return config.value.userId === session.value.userId;
    });
}
function authorizeAdmin(sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!sessionId) {
            return false;
        }
        const session = yield sessions_repository_1.SessionsRepository.get(sessionId);
        if (session.isErr) {
            return false;
        }
        if (session.isOk) {
            return session.value.expiresAt > new Date() && session.value.userType === client_1.UserType.ADMIN;
        }
        return false;
    });
}
function authorize(userId, sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!sessionId) {
            return false;
        }
        const session = yield sessions_repository_1.SessionsRepository.get(sessionId);
        if (session.isErr) {
            return false;
        }
        if (session.isOk) {
            return session.value.expiresAt > new Date() && session.value.userId === userId;
        }
        return false;
    });
}
exports.default = handleError;
