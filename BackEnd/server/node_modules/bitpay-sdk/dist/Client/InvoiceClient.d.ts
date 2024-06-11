import { BitPayClient } from './BitPayClient';
import { Invoice, InvoiceInterface } from '../Model';
import { Facade } from '../index';
import { TokenContainer } from '../TokenContainer';
import { GuidGenerator } from '../util/GuidGenerator';
import { InvoiceEventTokenInterface } from '../Model/Invoice/InvoiceEventToken';
export declare class InvoiceClient {
    private bitPayClient;
    private tokenContainer;
    private guidGenerator;
    constructor(bitPayClient: BitPayClient, tokenContainer: TokenContainer, guidGenerator: GuidGenerator);
    /**
     * Create a BitPay invoice.
     *
     * @param invoice An Invoice object with request parameters defined
     * @param facade The facade used to create it.
     * @param signRequest Signed request.
     * @returns Invoice
     * @throws InvoiceCreationException.
     */
    create(invoice: Invoice, facade: Facade, signRequest: boolean): Promise<InvoiceInterface>;
    /**
     * Retrieve a BitPay invoice by invoice id using the specified facade. The client must have been previously
     * authorized for the specified facade (the public facade requires no authorization).
     *
     * @param invoiceId The id of the invoice to retrieve.
     * @param facade The facade used to create it.
     * @param signRequest Signed request.
     * @returns Invoice
     * @throws InvoiceQueryException
     */
    get(invoiceId: string, facade: Facade, signRequest: boolean): Promise<InvoiceInterface>;
    /**
     * @param guid
     * @param facade
     * @param signRequest
     * @returns Invoice
     * @throws InvoiceQueryException
     */
    getByGuid(guid: string, facade: Facade, signRequest: boolean): Promise<InvoiceInterface>;
    /**
     * Retrieve a collection of BitPay invoices.
     *
     * @param params
     * @returns Invoice[]
     * @throws InvoiceQueryException
     */
    getInvoices(params: object): Promise<InvoiceInterface[]>;
    /**
     *
     * @param invoiceId
     * @returns
     */
    getInvoiceEventToken(invoiceId: string): Promise<InvoiceEventTokenInterface>;
    /**
     * Update a BitPay invoice.
     *
     * @param invoiceId The id of the invoice to updated.
     * @param params
     * @returns Invoice
     * @throws InvoiceUpdateException
     */
    update(invoiceId: string, params: []): Promise<InvoiceInterface>;
    /**
     * Pay an invoice with a mock transaction
     *
     * @param invoiceId The id of the invoice.
     * @param status  Status the invoice will become. Acceptable values are confirmed (default) and complete.
     * @returns Invoice Invoice object.
     * @throws BitPayException
     */
    pay(invoiceId: string, status: string): Promise<InvoiceInterface>;
    /**
     * Cancel a BitPay invoice.
     *
     * @param invoiceId The id of the invoice to updated.
     * @param forceCancel
     * @returns Invoice  Cancelled invoice object.
     * @throws BitPayException
     */
    cancel(invoiceId: string, forceCancel: boolean): Promise<InvoiceInterface>;
    /**
     * Cancel a BitPay invoice.
     *
     * @param guid The guid of the invoice to cancel.
     * @param forceCancel
     * @returns Invoice Cancelled invoice object.
     * @throws BitPayException
     */
    cancelByGuid(guid: string, forceCancel: boolean): Promise<InvoiceInterface>;
    /**
     * Request a BitPay Invoice Webhook.
     *
     * @param invoiceId A BitPay invoice ID.
     * @returns boolean
     * @throws BitPayException
     */
    requestInvoiceWebhookToBeResent(invoiceId: string): Promise<boolean>;
}
