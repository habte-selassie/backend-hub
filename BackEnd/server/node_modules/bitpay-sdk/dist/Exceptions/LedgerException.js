"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerException = void 0;
class LedgerException {
    /**
     * Construct the LedgerException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'An unexpected error occurred while trying to manage the ledger';
        this.name = 'BITPAY-LEDGER-GENERIC';
        this.code = 131;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.LedgerException = LedgerException;
exports.default = LedgerException;
//# sourceMappingURL=LedgerException.js.map