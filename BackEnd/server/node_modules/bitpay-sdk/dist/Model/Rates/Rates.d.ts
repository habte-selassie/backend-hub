import { RateClient } from '../../Client/RateClient';
interface RateInterface {
    Name: string;
    cryptoCode: string;
    currencyPair: string;
    code: string;
    rate: number;
}
declare class Rates {
    private rates;
    constructor(rates: RateInterface[]);
    getRates(): RateInterface[];
    getRate(currencyCode: string): number;
    update(rateClient: RateClient): Promise<void>;
    private castRatesObj;
}
export { Rates, RateInterface };
