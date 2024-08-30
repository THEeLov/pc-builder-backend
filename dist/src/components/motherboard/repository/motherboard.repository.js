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
            const motherboard = yield client_1.prisma.$transaction(() => __awaiter(this, void 0, void 0, function* () {
                const component = yield client_1.prisma.component.create({
                    data: createObj.component,
                });
                const motherboard = yield client_1.prisma.motherboard.create({
                    data: {
                        id: createObj.id,
                        socket: createObj.socket,
                        formFactor: createObj.formFactor,
                        ramSlots: createObj.ramSlots,
                        ramType: createObj.ramType,
                        gpuInterface: createObj.gpuInterface,
                        stroageBusType: createObj.storageBusType,
                        componentId: component.id,
                    },
                    include: {
                        component: true,
                    },
                });
                return motherboard;
            }));
            return result_1.Result.ok(motherboard);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In motherboard create");
        }
    });
}
function getMany(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const motherboards = yield client_1.prisma.motherboard.findMany({
                where: {
                    socket: query.socket,
                    formFactor: query.formFactor,
                    ramSlots: query.ramSlots,
                    ramType: query.ramType,
                    gpuInterface: query.gpuInterface,
                    stroageBusType: query.storageBusType,
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
            return result_1.Result.ok(motherboards);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In motherboard getMany");
        }
    });
}
function getSingle(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const motherboard = yield client_1.prisma.motherboard.findUniqueOrThrow({
                where: { id },
                include: { component: true },
            });
            return result_1.Result.ok(motherboard);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In motherboard getSingle");
        }
    });
}
function update(id, updateObj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const motherboard = yield client_1.prisma.motherboard.update({
                where: { id },
                data: updateObj,
                include: {
                    component: true,
                },
            });
            return result_1.Result.ok(motherboard);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in motherboard update");
        }
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.prisma.$transaction(() => __awaiter(this, void 0, void 0, function* () {
                const motherboard = yield client_1.prisma.motherboard.findUniqueOrThrow({
                    where: { id },
                });
                yield client_1.prisma.motherboard.delete({
                    where: { id },
                });
                yield client_1.prisma.component.delete({
                    where: {
                        id: motherboard.componentId,
                    },
                });
            }));
            return result_1.Result.ok(undefined);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in motherboard remove");
        }
    });
}
const MotherboardRepo = {
    create,
    getMany,
    getSingle,
    update,
    remove,
};
exports.default = MotherboardRepo;
