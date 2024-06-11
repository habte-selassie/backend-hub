"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
const Currency_1 = require("../../Currency");
const BitPayException_1 = require("../../Exceptions/BitPayException");
class Invoice {
    /**
     * Constructor, create a minimal request Invoice object.
     *
     * @param price    The amount for which the invoice will be created.
     * @param currency The three digit currency type used to compute the invoice bitcoin amount.
     */
    constructor(price, currency) {
        this.price = price;
        this.setCurrency(currency);
    }
    setCurrency(_currency) {
        if (!Currency_1.Currency.isValid(_currency))
            throw new BitPayException_1.default(null, 'Error: currency code must be a type of Model.Currency', null);
        this.currency = _currency;
    }
}
exports.Invoice = Invoice;
//# sourceMappingURL=Invoice.js.map