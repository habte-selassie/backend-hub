import { PayoutInterface } from './Payout';
import { PayoutGroupFailedInterface } from './PayoutGroupFailed';
export interface PayoutGroupInterface {
    payouts: PayoutInterface[];
    failed: PayoutGroupFailedInterface[];
}
export declare class PayoutGroup implements PayoutGroupInterface {
    payouts: PayoutInterface[];
    failed: PayoutGroupFailedInterface[];
    constructor(payouts: PayoutInterface[], failed: PayoutGroupFailedInterface[]);
}
