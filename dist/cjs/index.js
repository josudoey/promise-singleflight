"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPromiseSingleflight = void 0;
function createPromiseSingleflight() {
    var group = {};
    return function (key, fn) {
        var forget = function () { delete group[key]; };
        var call = function (key, fn) {
            if (!group[key]) {
                group[key] = Promise.resolve(fn());
                group[key].then(forget, forget);
            }
            return group[key];
        };
        return call(key, fn);
    };
}
exports.createPromiseSingleflight = createPromiseSingleflight;
exports.default = createPromiseSingleflight;
