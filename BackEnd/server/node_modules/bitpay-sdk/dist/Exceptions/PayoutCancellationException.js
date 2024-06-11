"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutCancellationException = void 0;
class PayoutCancellationException {
    /**
     * Construct the PayoutCancellationException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to cancel payout';
        this.name = 'BITPAY-PAYOUT-CANCEL';
        this.code = 124;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.PayoutCancellationException = PayoutCancellationException;
exports.default = PayoutCancellationException;
//# sourceMappingURL=PayoutCancellationException.js.map