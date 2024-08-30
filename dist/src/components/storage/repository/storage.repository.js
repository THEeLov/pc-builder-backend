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
const result_1 = require("@badrap/result");
const utils_1 = __importDefault(require("../../../utils"));
function create(createObj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storage = yield client_1.prisma.$transaction(() => __awaiter(this, void 0, void 0, function* () {
                const component = yield client_1.prisma.component.create({
                    data: createObj.component,
                });
                const storage = yield client_1.prisma.storage.create({
                    data: {
                        id: createObj.id,
                        storageType: createObj.storageType,
                        capacity: createObj.capacity,
                        busType: createObj.busType,
                        componentId: component.id,
                    },
                    include: {
                        component: true,
                    },
                });
                return storage;
            }));
            return result_1.Result.ok(storage);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in storage create");
        }
    });
}
function getMany(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storages = yield client_1.prisma.storage.findMany({
                where: {
                    busType: query.storageBusType,
                    component: {
                        price: {
                            gte: query.minPrice,
                            lte: query.maxPrice,
                        },
                    },
                },
                include: {
                    component: true,
                },
            });
            return result_1.Result.ok(storages);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in storage FindMany");
        }
    });
}
function getSingle(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storage = yield client_1.prisma.storage.findUniqueOrThrow({
                where: { id },
                include: { component: true },
            });
            return result_1.Result.ok(storage);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In getSingle storage");
        }
    });
}
function update(id, updateObj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storage = yield client_1.prisma.storage.update({
                where: { id },
                data: updateObj,
                include: {
                    component: true,
                },
            });
            return result_1.Result.ok(storage);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In storage update");
        }
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.prisma.$transaction(() => __awaiter(this, void 0, void 0, function* () {
                const storage = yield client_1.prisma.storage.findUniqueOrThrow({
                    where: { id },
                });
                yield client_1.prisma.storage.delete({
                    where: { id },
                });
                yield client_1.prisma.component.delete({
                    where: { id: storage.componentId },
                });
            }));
            return result_1.Result.ok(undefined);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In storage delete");
        }
    });
}
const StorageRepo = {
    getMany,
    getSingle,
    create,
    update,
    remove,
};
exports.default = StorageRepo;
