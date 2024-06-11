export interface LedgerInterface {
    currency: string;
    balance: number;
}
export declare class Ledger implements LedgerInterface {
    currency: string;
    balance: number;
    constructor();
}
