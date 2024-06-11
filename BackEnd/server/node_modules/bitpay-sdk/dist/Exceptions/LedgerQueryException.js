"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerQueryException = void 0;
class LedgerQueryException {
    /**
     * Construct the LedgerQueryException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to retrieve ledger';
        this.name = 'BITPAY-LEDGER-GET';
        this.code = 132;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.LedgerQueryException = LedgerQueryException;
exports.default = LedgerQueryException;
//# sourceMappingURL=LedgerQueryException.js.map