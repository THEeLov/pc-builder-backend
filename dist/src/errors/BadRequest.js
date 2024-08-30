"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BadRequest extends Error {
    constructor(message = "Bad Request") {
        super(message);
        this.name = "Bad Request";
    }
}
exports.default = BadRequest;
