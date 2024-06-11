"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateKey = void 0;
class PrivateKey {
    constructor(value) {
        value = value.replace('"', '');
        this.value = value;
    }
    /**
     *
     * @returns string
     */
    getValue() {
        return this.value;
    }
}
exports.PrivateKey = PrivateKey;
//# sourceMappingURL=PrivateKey.js.map