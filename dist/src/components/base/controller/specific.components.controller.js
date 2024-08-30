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
const Unauthorized_1 = __importDefault(require("../../../errors/Unauthorized"));
const validation_1 = require("../../../base/validation/validation");
const sessions_repository_1 = require("../../../sessions/repository/sessions.repository");
const BadRequest_1 = __importDefault(require("../../../errors/BadRequest"));
const query_convert_1 = require("../../universal_types/query.convert");
const InternalError_1 = __importDefault(require("../../../errors/InternalError"));
const validation_2 = require("../validation/validation");
const utils_1 = require("../../../utils");
function getImageUrl(url) {
    if (!url) {
        return undefined;
    }
    const parts = url.split("/images/");
    const result = parts.length > 1 ? parts[1] : url;
    return result;
}
function convertComponent(component) {
    if (!component) {
        return undefined;
    }
    component.price = parseFloat(component.price);
    return component;
}
function getMany(repo, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validSessionCookie = validation_1.baseValidation.cookieSchema.safeParse(req.cookies);
        if (!validSessionCookie.success) {
            return res.status(401).json(Unauthorized_1.default);
        }
        const priceQuery = validation_2.PriceQuery.safeParse(req.query);
        if (!priceQuery.success) {
            return res.status(400).json(BadRequest_1.default);
        }
        const sessionResult = yield sessions_repository_1.SessionsRepository.getFull(validSessionCookie.data.sessionId);
        let query;
        if (sessionResult.isOk && sessionResult.value.user.partialUserConfiguration) {
            const configuration = (0, query_convert_1.convertConfig)(sessionResult.value.user.partialUserConfiguration);
            query = (0, query_convert_1.convertConfigurationToQueryType)(configuration);
        }
        else {
            query = {};
        }
        query.maxPrice = priceQuery.data.maxPrice ? parseInt(priceQuery.data.maxPrice) : undefined;
        query.minPrice = priceQuery.data.minPrice ? parseInt(priceQuery.data.minPrice) : undefined;
        const result = yield repo.getMany(query);
        if (!result.isOk) {
            return res.status(500).json(InternalError_1.default);
        }
        return res.status(200).json(result.value);
    });
}
function getSingle(repo, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validatedParams = validation_1.baseValidation.IdRequestParams.safeParse(req.params);
        if (!validatedParams.success) {
            return res.status(400).json(BadRequest_1.default);
        }
        const object = yield repo.getSingle(validatedParams.data.id);
        if (!object.isOk) {
            return res.status(500).json(InternalError_1.default);
        }
        return res.status(200).json(object.value);
    });
}
function create(Create, repo, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        req.body.component = convertComponent(req.body.component);
        if (!req.body.component) {
            return res.status(400).json(BadRequest_1.default);
        }
        req.body.component.imageUrl = "http://localhost:3000/images/" + getImageUrl((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const validatedBody = Create.safeParse(req.body);
        if (!validatedBody.success) {
            return res.status(400).json(BadRequest_1.default);
        }
        // if (!(await authorizeAdmin(req.cookies.sessionId))) {
        //     return res.status(401).json(Unauthorized)
        // }
        const component = yield repo.create(validatedBody.data);
        if (!component.isOk) {
            return res.status(500).json(InternalError_1.default);
        }
        return res.status(200).json(component.value);
    });
}
function remove(repo, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validatedParams = validation_1.baseValidation.IdRequestParams.safeParse(req.params);
        if (!validatedParams.success) {
            return res.status(400).json(BadRequest_1.default);
        }
        if (!(yield (0, utils_1.authorizeAdmin)(req.cookies.sessionId))) {
            return res.status(401).json(Unauthorized_1.default);
        }
        const deletion = yield repo.remove(validatedParams.data.id);
        if (!deletion.isOk) {
            return res.status(500).json(InternalError_1.default);
        }
        return res.status(200).json();
    });
}
function update(Update, repo, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validatedParams = validation_1.baseValidation.IdRequestParams.safeParse(req.params);
        const validatedBody = Update.safeParse(req.body);
        if (!validatedBody.success || !validatedParams.success) {
            return res.status(400).json(BadRequest_1.default);
        }
        if (!(yield (0, utils_1.authorizeAdmin)(req.cookies.sessionId))) {
            return res.status(401).json(Unauthorized_1.default);
        }
        const updatedComponent = yield repo.update(validatedParams.data.id, validatedBody.data);
        if (!updatedComponent.isOk) {
            return res.status(500).json(InternalError_1.default);
        }
        return res.status(200).json(updatedComponent.value);
    });
}
const baseComponentController = {
    getMany,
    getSingle,
    create,
    remove,
    update,
};
exports.default = baseComponentController;
