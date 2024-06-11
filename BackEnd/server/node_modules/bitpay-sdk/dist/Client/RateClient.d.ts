import { RateInterface, Rates } from '../Model';
import { BitPayClient } from './BitPayClient';
export declare class RateClient {
    private bitPayClient;
    constructor(bitPayClient: BitPayClient);
    /**
     * Retrieve the rate for a cryptocurrency / fiat pair
     *
     * @param baseCurrency The cryptocurrency for which you want to fetch the fiat-equivalent rate.
     * @param currency The fiat currency for which you want to fetch the baseCurrency rate
     * @returns Rate  A Rate object populated with the currency rate for the requested baseCurrency.
     * @throws RateQueryException
     */
    getRate(baseCurrency: string, currency: string): Promise<RateInterface>;
    /**
     * Retrieve the exchange rate table maintained by BitPay.  See https://bitpay.com/bitcoin-exchange-rates.
     *
     * @param currency
     * @returns Rates A Rates object populated with the currency rates for the requested baseCurrency.
     * @throws RateQueryException
     */
    getRates(currency?: string): Promise<Rates>;
}
