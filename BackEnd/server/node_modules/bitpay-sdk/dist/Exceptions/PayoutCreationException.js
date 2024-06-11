"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutCreationException = void 0;
class PayoutCreationException {
    /**
     * Construct the PayoutCreationException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to create payout';
        this.name = 'BITPAY-PAYOUT-SUBMIT';
        this.code = 122;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.PayoutCreationException = PayoutCreationException;
exports.default = PayoutCreationException;
//# sourceMappingURL=PayoutCreationException.js.map