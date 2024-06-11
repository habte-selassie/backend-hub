"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutRecipientNotificationException = void 0;
class PayoutRecipientNotificationException {
    /**
     * Construct the PayoutRecipientNotificationException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to payout recipient notification';
        this.name = 'BITPAY-PAYOUT-RECIPIENT-NOTIFICATION';
        this.code = 196;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.PayoutRecipientNotificationException = PayoutRecipientNotificationException;
exports.default = PayoutRecipientNotificationException;
//# sourceMappingURL=PayoutRecipientNotificationException.js.map