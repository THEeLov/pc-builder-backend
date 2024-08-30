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
exports.ParcialConfigurationRepository = void 0;
const result_1 = require("@badrap/result");
const client_1 = require("../../../client");
const utils_1 = __importDefault(require("../../../utils"));
const configurationQuery_1 = __importDefault(require("../../configurationQuery"));
function create(userId, createObj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newConfig = yield client_1.prisma.parcialPCConfiguration.create({
                data: Object.assign(Object.assign({}, createObj), { userId, rams: {
                        connect: createObj.rams,
                    }, storages: {
                        connect: createObj.storages,
                    } }),
                include: configurationQuery_1.default,
            });
            return result_1.Result.ok(newConfig);
        }
        catch (e) {
            return (0, utils_1.default)(e, "at create partial config");
        }
    });
}
function update(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = yield client_1.prisma.parcialPCConfiguration.update({
                where: {
                    userId,
                },
                data: {
                    configurationType: data.configurationType,
                    motherboardId: data.motherboardId,
                    processorId: data.processorId,
                    gpuId: data.gpuId,
                    pcCaseId: data.PCCaseId,
                    powerSupplyId: data.powerSupplyId,
                    storages: {
                        connect: data.storageId ? { id: data.storageId } : undefined,
                    },
                    rams: {
                        connect: data.ramId ? { id: data.ramId } : undefined,
                    },
                },
                include: configurationQuery_1.default,
            });
            return result_1.Result.ok(config);
        }
        catch (e) {
            console.log(e);
            return (0, utils_1.default)(e, "at update partial config");
        }
    });
}
function removeComponent(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = yield client_1.prisma.parcialPCConfiguration.update({
                where: {
                    userId,
                },
                data: {
                    motherboardId: data.motherboardId,
                    processorId: data.processorId,
                    powerSupplyId: data.powerSupplyId,
                    pcCaseId: data.PCCaseId,
                    gpuId: data.gpuId,
                    storages: {
                        disconnect: data.storageId ? { id: data.storageId } : undefined,
                    },
                    rams: {
                        disconnect: data.ramId ? { id: data.ramId } : undefined,
                    },
                },
                include: configurationQuery_1.default,
            });
            return result_1.Result.ok(config);
        }
        catch (e) {
            console.log(e);
            return (0, utils_1.default)(e, "in rams or storage cparcialconfig delete");
        }
    });
}
function remove(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.prisma.parcialPCConfiguration.delete({
                where: {
                    userId,
                },
            });
            return result_1.Result.ok(undefined);
        }
        catch (e) {
            return (0, utils_1.default)(e, "at partial config delete");
        }
    });
}
function get(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = yield client_1.prisma.parcialPCConfiguration.findFirstOrThrow({
                where: {
                    userId,
                },
                include: configurationQuery_1.default,
            });
            return result_1.Result.ok(config);
        }
        catch (e) {
            return (0, utils_1.default)(e, "at parcial config get");
        }
    });
}
exports.ParcialConfigurationRepository = {
    create,
    update,
    remove,
    get,
    removeComponent,
};
