"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillException = void 0;
class BillException {
    /**
     * Construct the BillException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'An unexpected error occurred while trying to manage the bill';
        this.name = 'BITPAY-BILL-GENERIC';
        this.code = 111;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.BillException = BillException;
exports.default = BillException;
//# sourceMappingURL=BillException.js.map