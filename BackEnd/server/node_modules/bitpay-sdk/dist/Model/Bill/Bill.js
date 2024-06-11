"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bill = void 0;
const Currency_1 = require("../../Currency");
const BitPayException_1 = require("../../Exceptions/BitPayException");
const Item_1 = require("./Item");
class Bill {
    /**
     * Constructor, create a minimal request Bill object.
     *
     * @param number   A string for tracking purposes.
     * @param currency The three digit currency type used to compute the bill's amount.
     * @param email    The email address of the receiver for this bill.
     * @param items    The list of itens to add to this bill.
     */
    constructor(number, currency, email, items) {
        this.number = number;
        this.setCurrency(currency);
        this.email = email;
        this.items = items;
    }
    setCurrency(_currency) {
        if (!Currency_1.Currency.isValid(_currency))
            throw new BitPayException_1.default(null, 'Error: currency code must be a type of Model.Currency', null);
        this.currency = _currency;
    }
}
exports.Bill = Bill;
exports.default = Item_1.Item;
//# sourceMappingURL=Bill.js.map