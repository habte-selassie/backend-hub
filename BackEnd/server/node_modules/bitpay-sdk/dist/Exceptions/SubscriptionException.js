"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionException = void 0;
class SubscriptionException {
    /**
     * Construct the SubscriptionException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'An unexpected error occurred while trying to manage the subscription';
        this.name = 'BITPAY-SUBSCRIPTION-GENERIC';
        this.code = 171;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.SubscriptionException = SubscriptionException;
exports.default = SubscriptionException;
//# sourceMappingURL=SubscriptionException.js.map