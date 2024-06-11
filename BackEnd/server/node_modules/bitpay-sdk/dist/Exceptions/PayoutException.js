"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutException = void 0;
class PayoutException {
    /**
     * Construct the PayoutException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'An unexpected error occurred while trying to manage the payout batch';
        this.name = 'BITPAY-PAYOUT-GENERIC';
        this.code = 121;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.PayoutException = PayoutException;
exports.default = PayoutException;
//# sourceMappingURL=PayoutException.js.map