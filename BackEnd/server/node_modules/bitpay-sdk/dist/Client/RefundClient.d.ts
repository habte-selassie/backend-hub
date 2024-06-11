import { BitPayClient } from './BitPayClient';
import { TokenContainer } from '../TokenContainer';
import { GuidGenerator } from '../util/GuidGenerator';
import { RefundInterface } from '../Model/Invoice/Refund';
export declare class RefundClient {
    private bitPayClient;
    private tokenContainer;
    private guidGenerator;
    constructor(bitPayClient: BitPayClient, tokenContainer: TokenContainer, guidGenerator: GuidGenerator);
    /**
     * Create a refund for a BitPay invoice.
     *
     * @param refund RefundInterface
     * @returns Refund An updated Refund Object
     * @throws RefundCreationException
     */
    create(refund: RefundInterface): Promise<RefundInterface>;
    /**
     * Retrieve a previously made refund request on a BitPay invoice.
     *
     * @param refundId The BitPay refund ID.
     * @returns Refund BitPay Refund object with the associated Refund object.
     * @throws RefundQueryException
     */
    get(refundId: string): Promise<RefundInterface>;
    getByGuid(guid: string): Promise<RefundInterface>;
    /**
     * Retrieve a previously made refund request on a BitPay invoice by guid.
     *
     * @param invoiceId The BitPay refund Guid.
     * @returns Refund BitPay Refund object with the associated Refund object.
     * @throws RefundQueryException
     */
    getRefunds(invoiceId: string): Promise<RefundInterface[]>;
    /**
     * Send a refund notification.
     *
     * @param refundId A BitPay refund ID.
     * @returns boolean An updated Refund Object
     * @throws RefundException
     */
    sendRefundNotification(refundId: string): Promise<boolean>;
    /**
     * Update the status of a BitPay invoice.
     *
     * @param refundId BitPay refund ID.
     * @param status The new status for the refund to be updated.
     * @returns Refund A BitPay generated Refund object.
     * @throws RefundException
     */
    update(refundId: string, status: string): Promise<RefundInterface>;
    /**
     * Update the status of a BitPay invoice.
     *
     * @param guid BitPay refund Guid.
     * @param status The new status for the refund to be updated.
     * @returns  Refund A BitPay generated Refund object.
     * @throws RefundException
     */
    updateByGuid(guid: string, status: string): Promise<RefundInterface>;
    /**
     * Cancel a previously submitted refund request on a BitPay invoice.
     *
     * @param refundId The refund Id for the refund to be canceled.
     * @returns Cancelled refund Object.
     * @throws RefundCreationException
     */
    cancel(refundId: string): Promise<RefundInterface>;
    /**
     * Cancel a previously submitted refund request on a BitPay invoice
     *
     * @param guid The refund Guid for the refund to be canceled.
     * @returns Cancelled refund Object.
     * @throws RefundCreationException
     */
    cancelByGuid(guid: string): Promise<RefundInterface>;
}
