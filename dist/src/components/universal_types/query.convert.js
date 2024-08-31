"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertConfigurationToQueryType = exports.convertConfig = void 0;
function convertConfig(config) {
    var _a, _b, _c, _d, _e;
    const returnObj = {
        motherboard: (_a = config.motherboard) !== null && _a !== void 0 ? _a : undefined,
        processor: (_b = config.processor) !== null && _b !== void 0 ? _b : undefined,
        rams: config.rams,
        gpu: (_c = config.gpu) !== null && _c !== void 0 ? _c : undefined,
        storages: config.storages,
        powerSupply: (_d = config.powerSupply) !== null && _d !== void 0 ? _d : undefined,
        pcCase: (_e = config.pcCase) !== null && _e !== void 0 ? _e : undefined,
    };
    return returnObj;
}
exports.convertConfig = convertConfig;
function convertConfigurationToQueryType(configuration) {
    const query = {
        socket: undefined,
        formFactor: undefined,
        ramSlots: undefined,
        ramType: undefined,
        gpuInterface: undefined,
        storageBusType: undefined,
        powerIO: undefined,
    };
    if (configuration.motherboard) {
        query.socket = configuration.motherboard.socket;
        query.formFactor = configuration.motherboard.formFactor;
        query.ramType = configuration.motherboard.ramType;
        query.gpuInterface = configuration.motherboard.gpuInterface;
        query.storageBusType = configuration.motherboard.stroageBusType;
    }
    if (configuration.gpu) {
        query.gpuInterface = configuration.gpu.interface;
        query.powerIO = configuration.gpu.power;
    }
    if (configuration.pcCase) {
        query.formFactor = configuration.pcCase.formFactor;
    }
    if (configuration.powerSupply) {
        query.powerIO = configuration.powerSupply.powerOutput;
        query.formFactor = configuration.powerSupply.formFactor;
    }
    if (configuration.processor) {
        query.socket = configuration.processor.socket;
    }
    if (configuration.rams.length > 0) {
        query.ramType = configuration.rams[0].memoryType;
        query.ramSlots = { gte: configuration.rams.length };
    }
    if (configuration.storages.length > 0) {
        query.storageBusType = configuration.storages[0].busType;
    }
    return query;
}
exports.convertConfigurationToQueryType = convertConfigurationToQueryType;
