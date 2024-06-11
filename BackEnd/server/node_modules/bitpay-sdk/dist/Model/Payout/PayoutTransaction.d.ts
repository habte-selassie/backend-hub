export interface PayoutTransactionInterface {
    txid: string | null;
    amount: number | null;
    date: number | null;
}
export declare class PayoutTransaction implements PayoutTransactionInterface {
    txid: string | null;
    amount: number | null;
    date: number | null;
    constructor();
}
