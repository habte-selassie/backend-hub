export interface CurrencyInterface {
    code: string;
    name: string;
    symbol: string;
    precision: number;
    decimals: number;
}
export declare class Currency implements CurrencyInterface {
    code: string;
    name: string;
    symbol: string;
    precision: number;
    decimals: number;
}
