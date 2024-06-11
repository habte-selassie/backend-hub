import { BitPayClient } from './BitPayClient';
import { TokenContainer } from '../TokenContainer';
import { GuidGenerator } from '../util/GuidGenerator';
import { PayoutRecipientInterface, PayoutRecipients } from '../Model';
export declare class PayoutRecipientClient {
    private bitPayClient;
    private tokenContainer;
    private guidGenerator;
    constructor(bitPayClient: BitPayClient, tokenContainer: TokenContainer, guidGenerator: GuidGenerator);
    /**
     * Submit BitPay Payout Recipients.
     *
     * @param recipients A PayoutRecipients object with request parameters defined.
     * @returns PayoutRecipients[]  A list of BitPay PayoutRecipients objects.
     * @throws PayoutRecipientCreationException
     */
    submit(recipients: PayoutRecipients): Promise<PayoutRecipientInterface[]>;
    /**
     * Update a Payout Recipient.
     *
     * @param recipientId The recipient id for the recipient to be updated.
     * @param recipient A PayoutRecipient object with updated parameters defined.
     * @returns PayoutRecipient
     * @throws PayoutRecipientUpdateException
     */
    update(recipientId: string, recipient: PayoutRecipientInterface): Promise<PayoutRecipientInterface>;
    /**
     * Retrieve a BitPay payout recipient by batch id using.  The client must have been previously authorized for the payout facade.
     *
     * @param recipientId The id of the recipient to retrieve.
     * @returns PayoutRecipient
     * @throws PayoutRecipientQueryException
     */
    get(recipientId: string): Promise<PayoutRecipientInterface>;
    /**
     * Retrieve a collection of BitPay Payout Recipients.
     *
     * @param params
     * @returns PayoutRecipient[]
     * @throws PayoutRecipientQueryException
     */
    getByFilters(params: object): Promise<PayoutRecipientInterface[]>;
    /**
     * Delete a Payout Recipient.
     *
     * @param recipientId The recipient id for the recipient to be deleted.
     * @returns boolean True if the recipient was successfully deleted, false otherwise.
     * @throws PayoutRecipientCancellationException
     */
    delete(recipientId: string): Promise<boolean>;
    /**
     * Notify BitPay Payout Recipient.
     *
     * @param recipientId The id of the recipient to notify.
     * @returns boolean  True if the notification was successfully sent, false otherwise.
     * @throws PayoutRecipientNotificationException
     */
    requestNotification(recipientId: string): Promise<boolean>;
}
