export interface PayoutInstructionTransactionInterface {
    txid: string | null;
    amount: number | null;
    date: number | null;
}
export declare class PayoutInstructionTransaction implements PayoutInstructionTransactionInterface {
    txid: string | null;
    amount: number | null;
    date: number | null;
    constructor();
}
