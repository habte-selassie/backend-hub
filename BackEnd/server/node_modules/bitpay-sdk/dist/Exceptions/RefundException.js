"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundException = void 0;
class RefundException {
    /**
     * Construct the RefundException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'An unexpected error occurred while trying to manage the refund';
        this.name = 'BITPAY-REFUND-GENERIC';
        this.code = 161;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.RefundException = RefundException;
exports.default = RefundException;
//# sourceMappingURL=RefundException.js.map