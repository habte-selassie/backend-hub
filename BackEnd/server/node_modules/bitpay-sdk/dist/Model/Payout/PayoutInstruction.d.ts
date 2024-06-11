import { PayoutInstructionTransaction } from './PayoutInstructionTransaction';
import { PayoutInstructionBtcSummary } from './PayoutInstructionBtcSummary';
export interface PayoutInstructionInterface {
    amount: number | null;
    email: string | null;
    recipientId: string | null;
    shopperId: string | null;
    label: string | null;
    id: string | null;
    address: string | null;
    btc: PayoutInstructionBtcSummary;
    transactions: PayoutInstructionTransaction[];
    status: string | null;
}
export declare class PayoutInstruction implements PayoutInstructionInterface {
    amount: number | null;
    btc: PayoutInstructionBtcSummary;
    email: string | null;
    id: string | null;
    label: string | null;
    recipientId: string | null;
    shopperId: string | null;
    status: string | null;
    transactions: PayoutInstructionTransaction[];
    address: string | null;
    /**
     * Constructor, create a PayoutInstruction object.
     *
     * @param amount      float amount (in currency of batch).
     * @param method      int Method used to target the recipient.
     * @param methodValue string value for the choosen target method.
     * @throws PayoutCreationException BitPayException class
     */
    constructor(amount: number, method: number, methodValue: string);
}
