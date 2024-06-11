"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundCreationException = void 0;
class RefundCreationException {
    /**
     * Construct the RefundCreationException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to create refund';
        this.name = 'BITPAY-REFUND-CREATE';
        this.code = 162;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.RefundCreationException = RefundCreationException;
exports.default = RefundCreationException;
//# sourceMappingURL=RefundCreationException.js.map