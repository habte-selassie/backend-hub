"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionCreationException = void 0;
class SubscriptionCreationException {
    /**
     * Construct the SubscriptionCreationException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to create subscription';
        this.name = 'BITPAY-SUBSCRIPTION-CREATE';
        this.code = 172;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.SubscriptionCreationException = SubscriptionCreationException;
exports.default = SubscriptionCreationException;
//# sourceMappingURL=SubscriptionCreationException.js.map