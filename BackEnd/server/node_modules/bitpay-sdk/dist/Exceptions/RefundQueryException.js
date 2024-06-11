"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundQueryException = void 0;
class RefundQueryException {
    /**
     * Construct the RefundQueryException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to retrieve refund';
        this.name = 'BITPAY-REFUND-GET';
        this.code = 163;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.RefundQueryException = RefundQueryException;
exports.default = RefundQueryException;
//# sourceMappingURL=RefundQueryException.js.map