"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateQueryException = void 0;
class RateQueryException {
    /**
     * Construct the RateQueryException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to retrieve rates';
        this.name = 'BITPAY-RATES-GET';
        this.code = 142;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.RateQueryException = RateQueryException;
exports.default = RateQueryException;
//# sourceMappingURL=RateQueryException.js.map