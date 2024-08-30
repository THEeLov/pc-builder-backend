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
function getMany(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rams = yield client_1.prisma.rAM.findMany({
                where: {
                    memoryType: query.ramType,
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
            return result_1.Result.ok(rams);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In getMany RAMS");
        }
    });
}
function create(createObj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ram = yield client_1.prisma.$transaction(() => __awaiter(this, void 0, void 0, function* () {
                const component = yield client_1.prisma.component.create({
                    data: createObj.component,
                });
                const ram = yield client_1.prisma.rAM.create({
                    data: {
                        id: createObj.id,
                        memoryType: createObj.memoryType,
                        capacity: createObj.capacity,
                        computerType: createObj.computerType,
                        componentId: component.id,
                    },
                    include: {
                        component: true,
                    },
                });
                return ram;
            }));
            return result_1.Result.ok(ram);
        }
        catch (e) {
            console.log(e);
            return (0, utils_1.default)(e, "Ram create");
        }
    });
}
function getSingle(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ram = yield client_1.prisma.rAM.findUniqueOrThrow({
                where: {
                    id,
                },
                include: {
                    component: true,
                },
            });
            return result_1.Result.ok(ram);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in RAM getSingle");
        }
    });
}
function update(id, updateObj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ram = yield client_1.prisma.rAM.update({
                where: {
                    id,
                },
                data: updateObj,
                include: {
                    component: true,
                },
            });
            return result_1.Result.ok(ram);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In update RAM");
        }
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.prisma.$transaction(() => __awaiter(this, void 0, void 0, function* () {
                const ram = yield client_1.prisma.rAM.findUniqueOrThrow({
                    where: { id },
                });
                yield client_1.prisma.rAM.delete({
                    where: {
                        id,
                    },
                });
                yield client_1.prisma.component.delete({
                    where: {
                        id: ram.componentId,
                    },
                });
            }));
            return result_1.Result.ok(undefined);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In RAM remove");
        }
    });
}
const RAMRepo = {
    getMany,
    getSingle,
    create,
    update,
    remove,
};
exports.default = RAMRepo;
