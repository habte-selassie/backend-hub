"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementException = void 0;
class SettlementException {
    /**
     * Construct the SettlementException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'An unexpected error occurred while trying to manage the settlements';
        this.name = 'BITPAY-SETTLEMENTS-GENERIC';
        this.code = 151;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.SettlementException = SettlementException;
exports.default = SettlementException;
//# sourceMappingURL=SettlementException.js.map