"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillDeliveryException = void 0;
class BillDeliveryException {
    /**
     * Construct the BillDeliveryException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message, apiCode = '000000') {
        this.message = 'An unexpected error occurred while trying to manage the bill';
        this.name = 'BITPAY-BILL-DELIVERY';
        this.code = 115;
        this.apiCode = '000000';
        this.message = message ? message : this.message;
        this.apiCode = apiCode ? apiCode : this.apiCode;
    }
}
exports.BillDeliveryException = BillDeliveryException;
exports.default = BillDeliveryException;
//# sourceMappingURL=BillDeliveryException.js.map