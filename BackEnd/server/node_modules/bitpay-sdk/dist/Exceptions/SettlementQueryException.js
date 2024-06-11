"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementQueryException = void 0;
class SettlementQueryException {
    /**
     * Construct the SettlementQueryException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'Failed to retrieve settlements';
        this.name = 'BITPAY-SETTLEMENTS-GET';
        this.code = 152;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.SettlementQueryException = SettlementQueryException;
exports.default = SettlementQueryException;
//# sourceMappingURL=SettlementQueryException.js.map