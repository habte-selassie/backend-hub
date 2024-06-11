"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundCancellationException = void 0;
class RefundCancellationException {
    /**
     * Construct the RefundCreationException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to create refund';
        this.name = 'BITPAY-REFUND-CREATE';
        this.code = 164;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.RefundCancellationException = RefundCancellationException;
exports.default = RefundCancellationException;
//# sourceMappingURL=RefundCancellationException.js.map