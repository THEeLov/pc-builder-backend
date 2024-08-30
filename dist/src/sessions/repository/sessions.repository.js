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
exports.SessionsRepository = void 0;
const client_1 = require("../../client");
const result_1 = require("@badrap/result");
const utils_1 = __importDefault(require("../../utils"));
const configurationQuery_1 = __importDefault(require("../../configurations/configurationQuery"));
const ONE_DAY_MILLIS = 1000 * 60 * 60 * 24;
function create(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield client_1.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId,
                },
            });
            const tomorrow = new Date(new Date().getTime() + ONE_DAY_MILLIS);
            const newSession = yield client_1.prisma.session.create({
                data: {
                    expiresAt: tomorrow,
                    userId,
                    userType: user.userType,
                },
            });
            return result_1.Result.ok(newSession);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in session create");
        }
    });
}
function get(sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const session = yield client_1.prisma.session.findUniqueOrThrow({
                where: {
                    id: sessionId,
                },
            });
            return result_1.Result.ok(session);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In session get");
        }
    });
}
function getFull(sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const session = yield client_1.prisma.session.findUniqueOrThrow({
                where: {
                    id: sessionId,
                },
                include: {
                    user: {
                        include: {
                            partialUserConfiguration: {
                                include: configurationQuery_1.default,
                            },
                        },
                    },
                },
            });
            return result_1.Result.ok(session);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in session get");
        }
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.prisma.session.delete({
                where: {
                    id,
                },
            });
            return result_1.Result.ok(undefined);
        }
        catch (e) {
            return (0, utils_1.default)(e, "session delete");
        }
    });
}
exports.SessionsRepository = {
    create,
    get,
    getFull,
    remove,
};
