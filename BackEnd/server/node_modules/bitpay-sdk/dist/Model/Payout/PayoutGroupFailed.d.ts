export interface PayoutGroupFailedInterface {
    errMessage: string;
    payoutId: string | null;
    payee: string | null;
}
export declare class PayoutGroupFailed implements PayoutGroupFailedInterface {
    errMessage: string;
    payee: string | null;
    payoutId: string | null;
}
