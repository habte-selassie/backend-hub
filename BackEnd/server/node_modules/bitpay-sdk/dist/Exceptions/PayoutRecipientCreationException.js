"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutRecipientCreationException = void 0;
class PayoutRecipientCreationException {
    /**
     * Construct the PayoutRecipientCreationException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to create payout recipient';
        this.name = 'BITPAY-PAYOUT-RECIPIENT-SUBMIT';
        this.code = 192;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.PayoutRecipientCreationException = PayoutRecipientCreationException;
exports.default = PayoutRecipientCreationException;
//# sourceMappingURL=PayoutRecipientCreationException.js.map