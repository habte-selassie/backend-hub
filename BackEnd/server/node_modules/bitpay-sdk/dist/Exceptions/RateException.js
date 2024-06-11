"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateException = void 0;
class RateException {
    /**
     * Construct the RateException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'An unexpected error occurred while trying to manage the rates';
        this.name = 'BITPAY-RATES-GENERIC';
        this.code = 141;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.RateException = RateException;
exports.default = RateException;
//# sourceMappingURL=RateException.js.map