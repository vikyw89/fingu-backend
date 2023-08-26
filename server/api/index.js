"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(request, response) {
    var _a = request.query.name, name = _a === void 0 ? 'World' : _a;
    response.send("Hello ".concat(name, "!"));
}
exports.default = default_1;
