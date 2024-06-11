"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyClient = void 0;
class CurrencyClient {
    constructor(bitPayClient) {
        this.bitPayClient = bitPayClient;
    }
    /**
     * Retrieve the Currency Info
     *
     * @param currencyCode
     * @returns Currency
     */
    async getCurrencyInfo(currencyCode) {
        let currencyInfo = null;
        await this.bitPayClient.get('currencies', null, false).then((ratesData) => {
            const data = JSON.parse(ratesData);
            data.some((element) => {
                currencyInfo = element;
                if (element['code'] == currencyCode) {
                    currencyInfo = element;
                    return true;
                }
            });
        });
        return currencyInfo;
    }
}
exports.CurrencyClient = CurrencyClient;
//# sourceMappingURL=CurrencyClient.js.map