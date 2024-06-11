"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutNotificationException = void 0;
class PayoutNotificationException {
    /**
     * Construct the PayoutNotificationException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to payout notification';
        this.name = 'BITPAY-PAYOUT-NOTIFICATION';
        this.code = 127;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.PayoutNotificationException = PayoutNotificationException;
exports.default = PayoutNotificationException;
//# sourceMappingURL=PayoutNotificationException.js.map