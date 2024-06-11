"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionUpdateException = void 0;
class SubscriptionUpdateException {
    /**
     * Construct the SubscriptionUpdateException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'An unexpected error occurred while trying to manage the subscription';
        this.name = 'BITPAY-SUBSCRIPTION-UPDATE';
        this.code = 174;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.SubscriptionUpdateException = SubscriptionUpdateException;
exports.default = SubscriptionUpdateException;
//# sourceMappingURL=SubscriptionUpdateException.js.map