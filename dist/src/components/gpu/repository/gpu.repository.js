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
            const gpu = yield client_1.prisma.$transaction(() => __awaiter(this, void 0, void 0, function* () {
                const component = yield client_1.prisma.component.create({
                    data: createObj.component,
                });
                const gpu = yield client_1.prisma.gPU.create({
                    data: {
                        id: createObj.id,
                        memory: createObj.memory,
                        powerConnector: createObj.powerConnector,
                        interface: createObj.interface,
                        power: createObj.power,
                        componentId: component.id,
                    },
                    include: {
                        component: true,
                    },
                });
                return gpu;
            }));
            return result_1.Result.ok(gpu);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In gpu create");
        }
    });
}
function getMany(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gpus = yield client_1.prisma.gPU.findMany({
                where: {
                    interface: query.gpuInterface,
                    power: {
                        lte: query.powerIO,
                    },
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
            return result_1.Result.ok(gpus);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in gpu getMany");
        }
    });
}
function getSingle(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gpu = yield client_1.prisma.gPU.findUniqueOrThrow({
                where: { id },
                include: { component: true },
            });
            return result_1.Result.ok(gpu);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in gpu getSingle");
        }
    });
}
function update(id, updateObj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gpu = yield client_1.prisma.gPU.update({
                where: { id },
                data: updateObj,
                include: {
                    component: true,
                },
            });
            return result_1.Result.ok(gpu);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In gpu update");
        }
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.prisma.$transaction(() => __awaiter(this, void 0, void 0, function* () {
                const gpu = yield client_1.prisma.gPU.findUniqueOrThrow({
                    where: { id },
                });
                yield client_1.prisma.gPU.delete({
                    where: { id },
                });
                yield client_1.prisma.component.delete({
                    where: { id: gpu.componentId },
                });
            }));
            return result_1.Result.ok(undefined);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in gpu remove");
        }
    });
}
const GPURepo = {
    getMany,
    getSingle,
    create,
    update,
    remove,
};
exports.default = GPURepo;
