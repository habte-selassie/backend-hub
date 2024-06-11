"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceException = void 0;
class InvoiceException {
    /**
     * Construct the InvoiceException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'An unexpected error occurred while trying to manage the invoice';
        this.name = 'BITPAY-INVOICE-GENERIC';
        this.code = 101;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.InvoiceException = InvoiceException;
exports.default = InvoiceException;
//# sourceMappingURL=InvoiceException.js.map