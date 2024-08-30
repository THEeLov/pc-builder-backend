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
            const pcCase = yield client_1.prisma.$transaction(() => __awaiter(this, void 0, void 0, function* () {
                const component = yield client_1.prisma.component.create({
                    data: createObj.component,
                });
                const pcCase = yield client_1.prisma.pCCase.create({
                    data: {
                        id: createObj.id,
                        formFactor: createObj.formFactor,
                        componentId: component.id,
                    },
                    include: {
                        component: true,
                    },
                });
                return pcCase;
            }));
            return result_1.Result.ok(pcCase);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In create PCCase");
        }
    });
}
function getMany(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pcCases = yield client_1.prisma.pCCase.findMany({
                where: {
                    formFactor: query.formFactor,
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
            return result_1.Result.ok(pcCases);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in getMany pcCases");
        }
    });
}
function getSingle(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pcCase = yield client_1.prisma.pCCase.findUniqueOrThrow({
                where: { id },
                include: { component: true },
            });
            return result_1.Result.ok(pcCase);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in getsingle pcccase");
        }
    });
}
function update(id, updateObj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pcCase = yield client_1.prisma.pCCase.update({
                where: { id },
                data: updateObj,
                include: {
                    component: true,
                },
            });
            return result_1.Result.ok(pcCase);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In pcCase update");
        }
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.prisma.$transaction(() => __awaiter(this, void 0, void 0, function* () {
                const pcCase = yield client_1.prisma.pCCase.findUniqueOrThrow({
                    where: { id },
                });
                yield client_1.prisma.pCCase.delete({
                    where: { id },
                });
                yield client_1.prisma.component.delete({
                    where: { id: pcCase.componentId },
                });
            }));
            return result_1.Result.ok(undefined);
        }
        catch (e) {
            return (0, utils_1.default)(e, "In remove PCCase");
        }
    });
}
const PCCaseRepo = {
    create,
    getMany,
    getSingle,
    update,
    remove,
};
exports.default = PCCaseRepo;
