export interface PayoutInstructionBtcSummaryInterface {
    paid: number | null;
    unpaid: number | null;
}
export declare class PayoutInstructionBtcSummary implements PayoutInstructionBtcSummaryInterface {
    paid: number | null;
    unpaid: number | null;
    constructor(paid: number, unpaid: number);
}
