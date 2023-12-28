"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.createPromiseSingleflight = void 0;
var singleflight_1 = require("./singleflight");
Object.defineProperty(exports, "createPromiseSingleflight", { enumerable: true, get: function () { return singleflight_1.createPromiseSingleflight; } });
exports.default = singleflight_1.createPromiseSingleflight;
exports.create = singleflight_1.createPromiseSingleflight;
