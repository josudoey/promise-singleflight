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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPromiseSingleflight = void 0;
function createPromiseSingleflight() {
    const group = new Map();
    return function (key, fn) {
        return __awaiter(this, void 0, void 0, function* () {
            const forget = function () { group.delete(key); };
            const call = function (key, fn) {
                return __awaiter(this, void 0, void 0, function* () {
                    let handle = group.get(key);
                    if (typeof handle !== 'undefined') {
                        return yield handle;
                    }
                    handle = fn();
                    group.set(key, handle);
                    handle.then(forget, forget);
                    return yield handle;
                });
            };
            return yield call(key, fn);
        });
    };
}
exports.createPromiseSingleflight = createPromiseSingleflight;
