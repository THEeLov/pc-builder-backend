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
const result_1 = require("@badrap/result");
const client_1 = require("../../../client");
const utils_1 = __importDefault(require("../../../utils"));
function create(createObj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const processor = yield client_1.prisma.$transaction(() => __awaiter(this, void 0, void 0, function* () {
                const component = yield client_1.prisma.component.create({
                    data: createObj.component,
                });
                const processor = yield client_1.prisma.processor.create({
                    data: {
                        id: createObj.id,
                        architecture: createObj.architecture,
                        cores: createObj.cores,
                        threads: createObj.threads,
                        bits: createObj.bits,
                        socket: createObj.socket,
                        componentId: component.id,
                    },
                    include: {
                        component: true,
                    },
                });
                return processor;
            }));
            return result_1.Result.ok(processor);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In processor create");
        }
    });
}
function getMany(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const processors = yield client_1.prisma.processor.findMany({
                where: {
                    socket: query.socket,
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
            return result_1.Result.ok(processors);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In processor getmany");
        }
    });
}
function getSingle(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const processor = yield client_1.prisma.processor.findUniqueOrThrow({
                where: { id },
                include: { component: true },
            });
            return result_1.Result.ok(processor);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In processor getSingle");
        }
    });
}
function update(id, updateObj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const processor = yield client_1.prisma.processor.update({
                where: { id },
                data: updateObj,
                include: { component: true },
            });
            return result_1.Result.ok(processor);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in processor update");
        }
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.prisma.$transaction(() => __awaiter(this, void 0, void 0, function* () {
                const processor = yield client_1.prisma.processor.findUniqueOrThrow({
                    where: { id },
                });
                yield client_1.prisma.processor.delete({
                    where: { id },
                });
                yield client_1.prisma.component.delete({
                    where: { id: processor.componentId },
                });
            }));
            return result_1.Result.ok(undefined);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in processor remove");
        }
    });
}
const ProcessorRepo = {
    getMany,
    getSingle,
    create,
    update,
    remove,
};
exports.default = ProcessorRepo;
