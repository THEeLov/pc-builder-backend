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
const specific_components_controller_1 = __importDefault(require("../../base/controller/specific.components.controller"));
const gpu_repository_1 = __importDefault(require("../repository/gpu.repository"));
const validation_1 = __importDefault(require("../validation/validation"));
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.memory || !req.body.power) {
            return res.status(400);
        }
        req.body.memory = parseInt(req.body.memory);
        req.body.power = parseInt(req.body.power);
        return yield specific_components_controller_1.default.create(validation_1.default.GPUCreate, gpu_repository_1.default, req, res);
    });
}
function getMany(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield specific_components_controller_1.default.getMany(gpu_repository_1.default, req, res);
    });
}
function getSingle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield specific_components_controller_1.default.getSingle(gpu_repository_1.default, req, res);
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield specific_components_controller_1.default.update(validation_1.default.GPUEdit, gpu_repository_1.default, req, res);
    });
}
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield specific_components_controller_1.default.remove(gpu_repository_1.default, req, res);
    });
}
const GPUController = {
    create,
    getMany,
    getSingle,
    update,
    remove,
};
exports.default = GPUController;
