"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutRecipientCancellationException = void 0;
class PayoutRecipientCancellationException {
    /**
     * Construct the PayoutRecipientCancellationException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to cancel payout recipient';
        this.name = 'BITPAY-PAYOUT-RECIPIENT-CANCEL';
        this.code = 194;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.PayoutRecipientCancellationException = PayoutRecipientCancellationException;
exports.default = PayoutRecipientCancellationException;
//# sourceMappingURL=PayoutRecipientCancellationException.js.map