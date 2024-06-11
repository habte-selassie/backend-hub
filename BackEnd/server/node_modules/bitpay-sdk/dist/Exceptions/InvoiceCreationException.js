"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceCreationException = void 0;
class InvoiceCreationException {
    /**
     * Construct the InvoiceCreationException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to create invoice';
        this.name = 'BITPAY-INVOICE-CREATE';
        this.code = 102;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.InvoiceCreationException = InvoiceCreationException;
exports.default = InvoiceCreationException;
//# sourceMappingURL=InvoiceCreationException.js.map