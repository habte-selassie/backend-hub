"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillQueryException = void 0;
class BillQueryException {
    /**
     * Construct the BillQueryException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to retrieve bill';
        this.name = 'BITPAY-BILL-GET';
        this.code = 113;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.BillQueryException = BillQueryException;
exports.default = BillQueryException;
//# sourceMappingURL=BillQueryException.js.map