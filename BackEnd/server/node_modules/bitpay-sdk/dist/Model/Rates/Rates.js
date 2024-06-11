"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rates = void 0;
const RateQueryException_1 = require("../../Exceptions/RateQueryException");
class Rates {
    constructor(rates) {
        this.rates = this.castRatesObj(rates);
    }
    getRates() {
        return this.rates;
    }
    getRate(currencyCode) {
        let val = 0;
        this.rates.forEach(function (rate) {
            if (rate.code === currencyCode) {
                val = rate.rate;
                return val;
            }
        });
        return val;
    }
    async update(rateClient) {
        try {
            const rates = await rateClient.getRates();
            this.rates = rates.getRates();
        }
        catch (e) {
            throw new RateQueryException_1.default(e);
        }
    }
    castRatesObj(ratesObj) {
        try {
            if (typeof ratesObj === 'string' || ratesObj instanceof String) {
                ratesObj = JSON.parse(ratesObj.toString());
            }
            return ratesObj;
        }
        catch (e) {
            throw new RateQueryException_1.default(e);
        }
    }
}
exports.Rates = Rates;
//# sourceMappingURL=Rates.js.map