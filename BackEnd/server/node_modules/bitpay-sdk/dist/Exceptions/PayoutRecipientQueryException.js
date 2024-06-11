"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutRecipientQueryException = void 0;
class PayoutRecipientQueryException {
    /**
     * Construct the PayoutRecipientQueryException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to retrieve payout recipient';
        this.name = 'BITPAY-PAYOUT-RECIPIENT-GET';
        this.code = 193;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.PayoutRecipientQueryException = PayoutRecipientQueryException;
exports.default = PayoutRecipientQueryException;
//# sourceMappingURL=PayoutRecipientQueryException.js.map