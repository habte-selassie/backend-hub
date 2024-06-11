"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillUpdateException = void 0;
class BillUpdateException {
    /**
     * Construct the BillUpdateException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'An unexpected error occurred while trying to manage the bill';
        this.name = 'BITPAY-BILL-UPDATE';
        this.code = 114;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.BillUpdateException = BillUpdateException;
exports.default = BillUpdateException;
//# sourceMappingURL=BillUpdateException.js.map