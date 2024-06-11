"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceUpdateException = void 0;
class InvoiceUpdateException {
    /**
     * Construct the InvoiceUpdateException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to create invoice';
        this.name = 'BITPAY-INVOICE-UPDATE';
        this.code = 104;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.InvoiceUpdateException = InvoiceUpdateException;
exports.default = InvoiceUpdateException;
//# sourceMappingURL=InvoiceUpdateException.js.map