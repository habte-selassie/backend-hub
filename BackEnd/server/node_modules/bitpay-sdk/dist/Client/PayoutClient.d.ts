import { BitPayClient } from './BitPayClient';
import { TokenContainer } from '../TokenContainer';
import { GuidGenerator } from '../util/GuidGenerator';
import { PayoutInterface } from '../Model';
import { PayoutGroupInterface } from '../Model/Payout/PayoutGroup';
export declare class PayoutClient {
    private bitPayClient;
    private tokenContainer;
    private guidGenerator;
    constructor(bitPayClient: BitPayClient, tokenContainer: TokenContainer, guidGenerator: GuidGenerator);
    /**
     * Submit a BitPay Payout.
     *
     * @param payout Payout object with request parameters defined.
     * @returns Pyaout
     * @throws PayoutCreationException
     */
    submit(payout: PayoutInterface): Promise<PayoutInterface>;
    /**
     * Retrieve a BitPay payout by payout id using. The client must have been previously authorized
     * for the payout facade.
     *
     * @param payoutId The id of the payout to retrieve.
     * @returns Pyaout
     * @throws PayoutQueryException
     */
    get(payoutId: string): Promise<PayoutInterface>;
    /**
     * Retrieve a collection of BitPay payouts.
     *
     * @param params
     * @returns Payout[]
     * @throws PayoutQueryException
     */
    getPayouts(params: object): Promise<PayoutInterface[]>;
    /**
     * Notify BitPay Payout.
     *
     * @param payoutId The id of the Payout to notify.
     * @returns boolean
     * @throws PayoutNotificationException
     */
    requestNotification: (payoutId: string) => Promise<boolean>;
    /**
     *  Cancel a BitPay Payout.
     *
     * @param payoutId
     * @returns boolean
     * @throws PayoutDeleteException
     */
    cancel: (payoutId: string) => Promise<boolean>;
    submitPayouts: (payouts: PayoutInterface[]) => Promise<PayoutGroupInterface>;
    cancelPayouts: (payoutGroupId: string) => Promise<PayoutGroupInterface>;
    private static getPayoutGroupResponse;
}
