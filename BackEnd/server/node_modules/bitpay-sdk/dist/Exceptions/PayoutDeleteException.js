"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutDeleteException = void 0;
class PayoutDeleteException {
    /**
     * Construct the PayoutDeleteException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to delete payout';
        this.name = 'BITPAY-PAYOUT-DELETE';
        this.code = 126;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.PayoutDeleteException = PayoutDeleteException;
exports.default = PayoutDeleteException;
//# sourceMappingURL=PayoutDeleteException.js.map