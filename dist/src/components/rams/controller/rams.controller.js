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
exports.RAMController = void 0;
const rams_repository_1 = __importDefault(require("../repository/rams.repository"));
const validation_1 = require("../validation/validation");
const specific_components_controller_1 = __importDefault(require("../../base/controller/specific.components.controller"));
function getMany(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield specific_components_controller_1.default.getMany(rams_repository_1.default, req, res);
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.capacity) {
            return res.status(400);
        }
        req.body.capacity = parseInt(req.body.capacity);
        return yield specific_components_controller_1.default.create(validation_1.RamCreate, rams_repository_1.default, req, res);
    });
}
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield specific_components_controller_1.default.remove(rams_repository_1.default, req, res);
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield specific_components_controller_1.default.update(validation_1.RamEdit, rams_repository_1.default, req, res);
    });
}
function getSingle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield specific_components_controller_1.default.getSingle(rams_repository_1.default, req, res);
    });
}
exports.RAMController = {
    getMany,
    getSingle,
    create,
    remove,
    update,
};
