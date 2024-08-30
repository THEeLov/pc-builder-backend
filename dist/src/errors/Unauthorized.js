"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Unauthorized extends Error {
    constructor(message = "Unauthorized") {
        super(message);
        this.name = "Unauthorized";
    }
}
exports.default = Unauthorized;
