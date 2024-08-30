"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InternalError extends Error {
    constructor(message = "The problem is on our side.") {
        super(message);
        this.name = "InternalError";
    }
}
exports.default = InternalError;
