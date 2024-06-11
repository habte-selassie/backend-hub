import { BitPayClient } from './BitPayClient';
import { CurrencyInterface } from '../Model/Currency/Currency';
export declare class CurrencyClient {
    private bitPayClient;
    constructor(bitPayClient: BitPayClient);
    /**
     * Retrieve the Currency Info
     *
     * @param currencyCode
     * @returns Currency
     */
    getCurrencyInfo(currencyCode: string): Promise<CurrencyInterface>;
}
