"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payout = void 0;
class Payout {
    /**
     * Constructor, create a request Payout object.
     *
     * @param amount            The decimal amount to be paid in the Payout request.
     * @param currency          The three digit currency string for the Payout to use.
     * @param ledgerCurrency    The three digit currency string for the Payout to use.
     */
    constructor(amount, currency, ledgerCurrency) {
        this.ignoreEmails = false;
        this.currency = currency;
        this.amount = amount;
        this.ledgerCurrency = ledgerCurrency;
    }
}
exports.Payout = Payout;
//# sourceMappingURL=Payout.js.map