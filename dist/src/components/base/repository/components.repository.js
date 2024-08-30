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
const motherboard_repository_1 = __importDefault(require("../../motherboard/repository/motherboard.repository"));
const processor_repository_1 = __importDefault(require("../../processor/repository/processor.repository"));
const gpu_repository_1 = __importDefault(require("../../gpu/repository/gpu.repository"));
const storage_repository_1 = __importDefault(require("../../storage/repository/storage.repository"));
const rams_repository_1 = __importDefault(require("../../rams/repository/rams.repository"));
const pcCase_repository_1 = __importDefault(require("../../pcCase/repository/pcCase.repository"));
const powerSupply_repository_1 = __importDefault(require("../../powerSupply/repository/powerSupply.repository"));
function getMany(query, type) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const components = yield client_1.prisma.component.findMany({
                where: {
                    componentType: type,
                    price: {
                        gte: query.minPrice ? parseInt(query.minPrice) : undefined,
                        lte: query.maxPrice ? parseInt(query.maxPrice) : undefined,
                    },
                },
            });
            return result_1.Result.ok(components);
        }
        catch (e) {
            return (0, utils_1.default)(e, "getMany components");
        }
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const component = yield client_1.prisma.component.findUniqueOrThrow({
                where: { id },
                include: {
                    motherboard: true,
                    processor: true,
                    gpu: true,
                    ram: true,
                    storage: true,
                    powerSupply: true,
                    pcCase: true,
                },
            });
            if (component.motherboard) {
                yield motherboard_repository_1.default.remove(component.motherboard.id);
            }
            else if (component.processor) {
                yield processor_repository_1.default.remove(component.processor.id);
            }
            else if (component.gpu) {
                yield gpu_repository_1.default.remove(component.gpu.id);
            }
            else if (component.ram) {
                yield rams_repository_1.default.remove(component.ram.id);
            }
            else if (component.storage) {
                yield storage_repository_1.default.remove(component.storage.id);
            }
            else if (component.powerSupply) {
                yield powerSupply_repository_1.default.remove(component.powerSupply.id);
            }
            else if (component.pcCase) {
                yield pcCase_repository_1.default.remove(component.pcCase.id);
            }
            return result_1.Result.ok(undefined);
        }
        catch (e) {
            return (0, utils_1.default)(e, "in component delete");
        }
    });
}
const ComponentRepo = {
    getMany,
    remove,
};
exports.default = ComponentRepo;
