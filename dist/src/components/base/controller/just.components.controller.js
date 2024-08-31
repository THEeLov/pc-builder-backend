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
exports.getMany = exports.remove = void 0;
const validation_1 = require("../../../base/validation/validation");
const components_repository_1 = __importDefault(require("../repository/components.repository"));
const InternalError_1 = __importDefault(require("../../../errors/InternalError"));
const BadRequest_1 = __importDefault(require("../../../errors/BadRequest"));
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = validation_1.baseValidation.IdRequestParams.safeParse(req.params);
        if (!id.success) {
            return res.status(400).json(BadRequest_1.default);
        }
        // if (!(await authorizeAdmin(req.cookies.sessionId))) {
        //     return res.status(401).json(Unauthorized)
        // }
        const result = yield components_repository_1.default.remove(id.data.id);
        if (!result.isOk) {
            console.log(result.error);
            return res.status(500).json(InternalError_1.default);
        }
        return res.status(200).json();
    });
}
exports.remove = remove;
function getMany(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield components_repository_1.default.getMany(req.query);
        if (!result.isOk) {
            return res.status(500).json(InternalError_1.default);
        }
        return res.status(200).json(result.value.map((component) => {
            return { component };
        }));
    });
}
exports.getMany = getMany;
