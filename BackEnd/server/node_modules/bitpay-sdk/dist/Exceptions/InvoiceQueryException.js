"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceQueryException = void 0;
class InvoiceQueryException {
    /**
     * Construct the InvoiceQueryException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to retrieve invoice';
        this.name = 'BITPAY-INVOICE-GET';
        this.code = 103;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.InvoiceQueryException = InvoiceQueryException;
exports.default = InvoiceQueryException;
//# sourceMappingURL=InvoiceQueryException.js.map