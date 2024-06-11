"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutUpdateException = void 0;
class PayoutUpdateException {
    /**
     * Construct the PayoutUpdateException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'An unexpected error occurred while trying to manage the payout';
        this.name = 'BITPAY-PAYOUT-UPDATE';
        this.code = 125;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.PayoutUpdateException = PayoutUpdateException;
exports.default = PayoutUpdateException;
//# sourceMappingURL=PayoutUpdateException.js.map