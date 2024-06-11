"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutQueryException = void 0;
class PayoutQueryException {
    /**
     * Construct the PayoutQueryException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to retrieve payout';
        this.name = 'BITPAY-PAYOUT-GET';
        this.code = 123;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.PayoutQueryException = PayoutQueryException;
exports.default = PayoutQueryException;
//# sourceMappingURL=PayoutQueryException.js.map