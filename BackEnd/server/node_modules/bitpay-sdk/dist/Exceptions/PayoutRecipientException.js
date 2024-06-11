"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutRecipientException = void 0;
class PayoutRecipientException {
    /**
     * Construct the PayoutRecipientException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'An unexpected error occurred while trying to manage the payout recipient';
        this.name = 'BITPAY-PAYOUT-RECIPIENT-GENERIC';
        this.code = 191;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.PayoutRecipientException = PayoutRecipientException;
exports.default = PayoutRecipientException;
//# sourceMappingURL=PayoutRecipientException.js.map