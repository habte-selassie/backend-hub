"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateClient = void 0;
const Model_1 = require("../Model");
const index_1 = require("../index");
class RateClient {
    constructor(bitPayClient) {
        this.bitPayClient = bitPayClient;
    }
    /**
     * Retrieve the rate for a cryptocurrency / fiat pair
     *
     * @param baseCurrency The cryptocurrency for which you want to fetch the fiat-equivalent rate.
     * @param currency The fiat currency for which you want to fetch the baseCurrency rate
     * @returns Rate  A Rate object populated with the currency rate for the requested baseCurrency.
     * @throws RateQueryException
     */
    async getRate(baseCurrency, currency) {
        const uri = currency ? 'rates/' + baseCurrency + '/' + currency : '/' + baseCurrency;
        try {
            const result = await this.bitPayClient.get(uri, null, false);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.RateQuery(e);
        }
    }
    /**
     * Retrieve the exchange rate table maintained by BitPay.  See https://bitpay.com/bitcoin-exchange-rates.
     *
     * @param currency
     * @returns Rates A Rates object populated with the currency rates for the requested baseCurrency.
     * @throws RateQueryException
     */
    async getRates(currency = null) {
        const uri = currency ? 'rates/' + currency : 'rates';
        try {
            const result = await this.bitPayClient.get(uri, null, false);
            return new Model_1.Rates(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.RateQuery(e);
        }
    }
}
exports.RateClient = RateClient;
//# sourceMappingURL=RateClient.js.map