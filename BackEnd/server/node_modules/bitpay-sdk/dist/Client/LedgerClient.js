"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerClient = void 0;
const Facade_1 = require("../Facade");
const index_1 = require("../index");
class LedgerClient {
    constructor(bitPayClient, tokenContainer) {
        this.bitPayClient = bitPayClient;
        this.tokenContainer = tokenContainer;
    }
    /**
     * Retrieve a list of ledgers using the merchant facade.
     *
     * @return A list of Ledger objects populated with the currency and current balance of each one.
     * @throws LedgerQueryException LedgerQueryException class
     */
    async getLedgers() {
        const params = { token: this.tokenContainer.getToken(Facade_1.Facade.Merchant) };
        try {
            const result = await this.bitPayClient.get('ledgers', params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.LedgerQuery('failed to deserialize BitPay server response (Ledger) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Retrieve a list of ledgers by params
     *
     * @param currency
     * @param params
     * @returns ledgers
     * @throws LedgerQueryException
     */
    async getEntries(currency, params) {
        params['token'] = this.tokenContainer.getToken(Facade_1.Facade.Merchant);
        try {
            const result = await this.bitPayClient.get('ledgers/' + currency, params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.LedgerQuery('failed to deserialize BitPay server response (Ledger) : ' + e.message, e.apiCode);
        }
    }
}
exports.LedgerClient = LedgerClient;
//# sourceMappingURL=LedgerClient.js.map