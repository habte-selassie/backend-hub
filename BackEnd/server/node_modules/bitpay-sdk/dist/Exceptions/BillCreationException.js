"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillCreationException = void 0;
class BillCreationException {
    /**
     * Construct the BillCreationException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to create bill';
        this.name = 'BITPAY-BILL-CREATE';
        this.code = 112;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.BillCreationException = BillCreationException;
exports.default = BillCreationException;
//# sourceMappingURL=BillCreationException.js.map