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
const validation_1 = require("../../../base/validation/validation");
const configuration_repository_1 = __importDefault(require("../repository/configuration.repository"));
const validation_2 = require("../../partial/validation/validation");
const utils_1 = require("../../../utils");
const validation_3 = __importDefault(require("../validation/validation"));
function getMany(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validatedParams = validation_1.baseValidation.IdRequestParams.safeParse(req.params);
        if (!validatedParams.success || !(yield (0, utils_1.authorize)(validatedParams.data.id, req.cookies.sessionId))) {
            return res.status(400).json(new Error("Bad request"));
        }
        const result = yield configuration_repository_1.default.getMany(validatedParams.data.id);
        if (!result.isOk) {
            return res.status(500).json(result.error);
        }
        return res.status(200).json(result.value);
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validatedParams = validation_3.default.configIdSchema.safeParse(req.params);
        const validatedBody = validation_2.parcialConfigSchema.fullUpdateObject.safeParse(req.body);
        if (!validatedParams.success ||
            !(yield (0, utils_1.authorizeWithConfigId)(validatedParams.data.configId, req.cookies.sessionId)) ||
            !validatedBody.success) {
            return res.status(400).json(new Error("Bad request"));
        }
        const config = yield configuration_repository_1.default.update(validatedParams.data.configId, validatedBody.data);
        if (!config.isOk) {
            return res.status(500).json(config.error);
        }
        return res.status(200).json(config.value);
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validatedParams = validation_1.baseValidation.IdRequestParams.safeParse(req.params);
        const validatedBody = validation_3.default.createObject.safeParse(req.body);
        if (!validatedParams.success ||
            !(yield (0, utils_1.authorize)(validatedParams.data.id, req.cookies.sessionId)) ||
            !validatedBody.success) {
            return res.status(400).json(new Error("Bad request"));
        }
        const newConfig = yield configuration_repository_1.default.create(validatedParams.data.id, validatedBody.data);
        if (!newConfig.isOk) {
            return res.status(500).json(newConfig.error);
        }
        return res.status(200).json(newConfig.value);
    });
}
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validatedParams = validation_3.default.configIdSchema.safeParse(req.params);
        if (!validatedParams.success ||
            !(yield (0, utils_1.authorizeWithConfigId)(validatedParams.data.configId, req.cookies.sessionId))) {
            return res.status(400).json(new Error("Bad request"));
        }
        const result = yield configuration_repository_1.default.remove(validatedParams.data.configId);
        if (!result.isOk) {
            return res.status(500).json(result.error);
        }
        return res.status(200).json(result.value);
    });
}
const ConfigurationController = {
    getMany,
    create,
    update,
    remove,
};
exports.default = ConfigurationController;
