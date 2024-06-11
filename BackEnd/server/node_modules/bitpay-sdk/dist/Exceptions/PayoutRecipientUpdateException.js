"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutRecipientUpdateException = void 0;
class PayoutRecipientUpdateException {
    /**
     * Construct the PayoutRecipientUpdateException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to update payout recipient';
        this.name = 'BITPAY-PAYOUT-RECIPIENT-UPDATE';
        this.code = 195;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.PayoutRecipientUpdateException = PayoutRecipientUpdateException;
exports.default = PayoutRecipientUpdateException;
//# sourceMappingURL=PayoutRecipientUpdateException.js.map