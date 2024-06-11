"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitPayException = void 0;
class BitPayException {
    /**
     * Construct the BitPayException.
     *
     * @param name    string [optional] The Exception type to throw.
     * @param message string [optional] The Exception message to throw.
     * @param code    number [optional] The Exception code to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(name = null, message = null, code = null, apiCode = '000000') {
        this.message = 'Unexpected Bitpay exeption';
        this.name = 'BITPAY-GENERIC';
        this.code = 100;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.name = name ? name : this.name;
        this.code = code ? code : this.code;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.BitPayException = BitPayException;
exports.default = BitPayException;
//# sourceMappingURL=BitPayException.js.map