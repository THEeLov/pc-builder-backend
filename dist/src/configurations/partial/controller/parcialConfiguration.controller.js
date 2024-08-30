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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcialConfigurationController = void 0;
const validation_1 = require("../validation/validation");
const validation_2 = require("../../../base/validation/validation");
const utils_1 = require("../../../utils");
const parcialConfiguration_repository_1 = require("../repository/parcialConfiguration.repository");
const client_1 = require("@prisma/client");
const defatult_configs_1 = require("../seeded_data/defatult-configs");
function getConfigAttributes(config) {
    switch (config) {
        case client_1.ConfigurationType.GAMING:
            return defatult_configs_1.GamingConfig;
        case client_1.ConfigurationType.OFFICE:
            return defatult_configs_1.OfficeConfig;
        case client_1.ConfigurationType.HIGH_END:
            return defatult_configs_1.HighEndConfig;
        case client_1.ConfigurationType.WORK:
            return defatult_configs_1.WorkConfig;
        default:
            return {};
    }
}
function get(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validatedParams = validation_2.baseValidation.IdRequestParams.safeParse(req.params);
        if (!validatedParams.success || !(yield (0, utils_1.authorize)(validatedParams.data.id, req.cookies.sessionId))) {
            return res.status(400).json(new Error("Bad request"));
        }
        const configuration = yield parcialConfiguration_repository_1.ParcialConfigurationRepository.get(validatedParams.data.id);
        if (configuration.isErr) {
            return res.status(401).json(configuration.error);
        }
        if (configuration.isOk) {
            return res.status(200).json(configuration.value);
        }
        return res.status(500).json(new Error("error on our side"));
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validatedParams = validation_2.baseValidation.IdRequestParams.safeParse(req.params);
        if (!validatedParams.success || !(yield (0, utils_1.authorize)(validatedParams.data.id, req.cookies.sessionId))) {
            return res.status(401).json(new Error("Unauthorized"));
        }
        const validatedBody = validation_1.parcialConfigSchema.updateObject.safeParse(req.body);
        if (!validatedBody.success) {
            console.log(req.body);
            return res.status(400).json(new Error("Bad request"));
        }
        if (validatedBody.data.delete) {
            return removeComponentFromConfig(res, validatedParams.data.id, validatedBody.data);
        }
        const updatedConfig = yield parcialConfiguration_repository_1.ParcialConfigurationRepository.update(validatedParams.data.id, validatedBody.data);
        if (!updatedConfig.isOk) {
            return res.status(500).json(updatedConfig.isErr ? updatedConfig.error : new Error("Internal error"));
        }
        return res.status(200).json(updatedConfig.value);
    });
}
function removeComponentFromConfig(res, userId, body) {
    return __awaiter(this, void 0, void 0, function* () {
        body.motherboardId = body.motherboardId ? null : undefined;
        body.processorId = body.processorId ? null : undefined;
        body.gpuId = body.gpuId ? null : undefined;
        body.PCCaseId = body.PCCaseId ? null : undefined;
        body.powerSupplyId = body.powerSupplyId ? null : undefined;
        const updatedConfig = yield parcialConfiguration_repository_1.ParcialConfigurationRepository.removeComponent(userId, body);
        if (!updatedConfig.isOk) {
            return res.status(500).json(updatedConfig.isErr ? updatedConfig.error : new Error("Internal error"));
        }
        return res.status(200).json(updatedConfig.value);
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validatedParams = validation_2.baseValidation.IdRequestParams.safeParse(req.params);
        const validatedBody = validation_1.parcialConfigSchema.createObject.safeParse(req.body);
        if (!validatedParams.success ||
            !validatedBody.success ||
            !(yield (0, utils_1.authorize)(validatedParams.data.id, req.cookies.sessionId))) {
            return res.status(400).json(new Error("Bad request"));
        }
        const configAttributes = getConfigAttributes(validatedBody.data.configurationType);
        const createdPartialConfig = yield parcialConfiguration_repository_1.ParcialConfigurationRepository.create(validatedParams.data.id, Object.assign(Object.assign({}, validatedBody.data), configAttributes));
        if (!createdPartialConfig.isOk) {
            return res
                .status(500)
                .json(createdPartialConfig.isErr ? createdPartialConfig.error : new Error("Internal error"));
        }
        return res.status(200).json(createdPartialConfig.value);
    });
}
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validatedParams = validation_2.baseValidation.IdRequestParams.safeParse(req.params);
        if (!validatedParams.success || !(yield (0, utils_1.authorize)(validatedParams.data.id, req.cookies.sessionId))) {
            return res.status(400).json(new Error("Bad Request"));
        }
        const result = yield parcialConfiguration_repository_1.ParcialConfigurationRepository.remove(validatedParams.data.id);
        if (result.isErr) {
            return res.status(500).json(result.error);
        }
        return res.status(200).json(undefined);
    });
}
exports.ParcialConfigurationController = {
    get,
    update,
    create,
    remove,
    removeComponentFromConfig,
};
