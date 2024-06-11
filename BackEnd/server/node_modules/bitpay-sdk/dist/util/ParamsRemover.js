"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsRemover = void 0;
class ParamsRemover {
    static removeNullValuesFromObject(obj) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
    }
}
exports.ParamsRemover = ParamsRemover;
//# sourceMappingURL=ParamsRemover.js.map