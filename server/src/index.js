"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
require("dotenv/config");
var routes_1 = require("./routes");
(0, routes_1.initRoutes)();
console.log('server started');
var init = function () { };
exports.init = init;
