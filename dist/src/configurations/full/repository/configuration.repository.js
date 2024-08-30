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
const client_1 = require("../../../client");
const utils_1 = __importDefault(require("../../../utils"));
const result_1 = require("@badrap/result");
const configurationQuery_1 = __importDefault(require("../../configurationQuery"));
function create(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = yield client_1.prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const config = yield prisma.pCConfiguration.create({
                    data: {
                        id: data.id,
                        configurationType: data.configurationType,
                        motherboardId: data.motherboardId,
                        processorId: data.processorId,
                        gpuId: data.gpuId,
                        powerSupplyId: data.powerSupplyId,
                        pcCaseId: data.PCCaseId,
                        userId: userId,
                        totalPrice: 0,
                        storages: {
                            connect: data.storages,
                        },
                        rams: {
                            connect: data.rams,
                        },
                    },
                    include: configurationQuery_1.default,
                });
                const price = config.motherboard.component.price +
                    config.processor.component.price +
                    config.gpu.component.price +
                    config.powerSupply.component.price +
                    config.pcCase.component.price +
                    config.rams.reduce((total, ram) => total + ram.component.price, 0) +
                    config.storages.reduce((total, storage) => total + storage.component.price, 0);
                const cfg = yield prisma.pCConfiguration.update({
                    where: {
                        id: config.id,
                    },
                    data: {
                        totalPrice: price,
                    },
                    include: configurationQuery_1.default,
                });
                return cfg;
            }));
            return result_1.Result.ok(config);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in config create");
        }
    });
}
function update(configId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = yield client_1.prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const config = yield prisma.pCConfiguration.update({
                    where: {
                        id: configId,
                    },
                    data: {
                        configurationType: data.configurationType,
                        motherboardId: data.motherboardId,
                        processorId: data.processorId,
                        gpuId: data.gpuId,
                        powerSupplyId: data.powerSupplyId,
                        pcCaseId: data.PCCaseId,
                        rams: {
                            set: data.rams,
                        },
                        storages: {
                            set: data.storages,
                        },
                    },
                    include: configurationQuery_1.default,
                });
                const price = config.motherboard.component.price +
                    config.processor.component.price +
                    config.gpu.component.price +
                    config.powerSupply.component.price +
                    config.pcCase.component.price +
                    config.rams.reduce((total, ram) => total + ram.component.price, 0) +
                    config.storages.reduce((total, storage) => total + storage.component.price, 0);
                const configWithPrice = yield prisma.pCConfiguration.update({
                    where: {
                        id: configId,
                    },
                    data: {
                        totalPrice: price,
                    },
                    include: configurationQuery_1.default,
                });
                return configWithPrice;
            }));
            return result_1.Result.ok(config);
        }
        catch (e) {
            return (0, utils_1.default)(e, "at config update");
        }
    });
}
function get(configId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = yield client_1.prisma.pCConfiguration.findFirstOrThrow({
                where: {
                    id: configId,
                },
                include: configurationQuery_1.default,
            });
            return result_1.Result.ok(config);
        }
        catch (e) {
            return (0, utils_1.default)(e, "at config get");
        }
    });
}
function getMany(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const configs = yield client_1.prisma.pCConfiguration.findMany({
                where: {
                    userId,
                },
                include: configurationQuery_1.default,
            });
            return result_1.Result.ok(configs);
        }
        catch (e) {
            return (0, utils_1.default)(e, "at getmany configs");
        }
    });
}
function remove(configId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.prisma.pCConfiguration.delete({
                where: {
                    id: configId,
                },
            });
            return result_1.Result.ok(undefined);
        }
        catch (e) {
            return (0, utils_1.default)(e, "at config delete");
        }
    });
}
const configurationRepository = {
    create,
    update,
    get,
    getMany,
    remove,
};
exports.default = configurationRepository;
