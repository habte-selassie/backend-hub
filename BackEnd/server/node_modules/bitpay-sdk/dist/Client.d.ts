import { Facade } from './index';
import { BillInterface, InvoiceInterface, LedgerEntryInterface, LedgerInterface, PayoutInterface, PayoutGroupInterface, PayoutRecipientInterface, PayoutRecipients, RateInterface, Rates } from './Model';
import { BitPayClient } from './Client/BitPayClient';
import { TokenContainer } from './TokenContainer';
import { Environment } from './Environment';
import { GuidGenerator } from './util/GuidGenerator';
import { InvoiceEventTokenInterface } from './Model/Invoice/InvoiceEventToken';
import { RefundInterface } from './Model/Invoice/Refund';
import { WalletInterface } from './Model/Wallet/Wallet';
import { SettlementInterface } from './Model/Settlement/Settlement';
import { PosToken } from './PosToken';
import { PrivateKey } from './PrivateKey';
import { CurrencyInterface } from './Model/Currency/Currency';
export declare class Client {
    private bitPayClient;
    private keyUtils;
    private guidGenerator;
    private tokenContainer;
    constructor(configFilePath: string | null, privateKey: PrivateKey | null, tokenContainer: TokenContainer | null, identity: string | null, posToken: PosToken | null, environment?: Environment, bitPayClient?: BitPayClient, // using for tests
    guidGenerator?: GuidGenerator);
    /**
     * Client factory for POS
     * @param posToken
     * @param environment
     */
    static createPosClient(posToken: string, environment?: Environment): Client;
    /**
     * Client factory based on config file
     *
     * @param configFilePath
     */
    static createClientByConfig(configFilePath: string): Client;
    /**
     * Client factory based on private key and tokens
     * @param privateKey
     * @param tokenContainer
     * @param environment
     */
    static createClientByPrivateKey(privateKey: string, tokenContainer: TokenContainer, environment?: Environment): Client;
    getToken(facade: Facade): string;
    /**
     * Retrieve the rates for a cryptocurrency / fiat pair. See https://bitpay.com/bitcoin-exchange-rates.
     *
     * @param baseCurrency the cryptocurrency for which you want to fetch the rates.
     *                     Current supported values are BTC and BCH.
     * @param currency the fiat currency for which you want to fetch the baseCurrency rates
     * @return A Rate object populated with the BitPay exchange rate table.
     */
    getRate(baseCurrency: string, currency: string): Promise<RateInterface>;
    /**
     * Retrieve the exchange rate table maintained by BitPay.  See https://bitpay.com/bitcoin-exchange-rates.
     * @param currency the cryptocurrency for which you want to fetch the rates.
     *                     Current supported values are BTC and BCH.
     * @return A Rates object populated with the BitPay exchange rate table.
     */
    getRates(currency?: string): Promise<Rates>;
    /**
     * Create a BitPay invoice using the Merchant facade.
     *
     * @param invoice An Invoice object with request parameters defined.
     * @param facade Facade for request.
     * @param signRequest Signed request.
     */
    createInvoice(invoice: InvoiceInterface, facade?: Facade, signRequest?: boolean): Promise<InvoiceInterface>;
    /**
     * Retrieve a BitPay invoice by invoice id using the public facade.
     *
     * @param invoiceId The id of the invoice to retrieve.
     * @param facade Facade for request.
     * @param signRequest Signed request.
     */
    getInvoice(invoiceId: string, facade?: Facade, signRequest?: boolean): Promise<InvoiceInterface>;
    /**
     * Retrieve a BitPay invoice by guid using the specified facade.
     * The client must have been previously authorized for the specified facade.
     *
     * @param guid The guid of the invoice to retrieve.
     * @param facade Facade for request.
     * @param signRequest Signed request.
     */
    getInvoiceByGuid(guid: string, facade?: Facade, signRequest?: boolean): Promise<InvoiceInterface>;
    /**
     * Retrieve a collection of BitPay invoices.
     *
     * @param params Available params:
     * dateStart The first date for the query filter.
     * dateEnd   The last date for the query filter.
     * status    The invoice status you want to query on.
     * orderId   The optional order id specified at time of invoice creation.
     * limit     Maximum results that the query will return (useful for paging results).
     * offset    Number of results to offset (ex. skip 10 will give you results starting with the 11th.
     */
    getInvoices(params: {
        dateStart: string | null;
        dateEnd: string | null;
        status: string | null;
        orderId: string | null;
        limit: number | null;
        offset: number | null;
    }): Promise<InvoiceInterface[]>;
    /**
     * Retrieves a bus token which can be used to subscribe to invoice events.
     *
     * @param invoiceId the id of the invoice for which you want to fetch an event token.
     */
    getInvoiceEventToken(invoiceId: string): Promise<InvoiceEventTokenInterface>;
    /**
     * Pay a BitPay invoice with a mock transaction. Available only on test env.
     *
     * @param invoiceId The id of the invoice to updated.
     * @param status    The status of the invoice to be updated, can be "confirmed" or "complete".
     * @return A BitPay generated Invoice object.
     */
    payInvoice(invoiceId: string, status: string): Promise<InvoiceInterface>;
    /**
     * Update a BitPay invoice with communication method.
     * @param invoiceId  The id of the invoice to updated.
     * @param params Available parameters:
     * buyerSms   The buyer's cell number.
     * smsCode    The buyer's received verification code.
     * buyerEmail The buyer's email address.
     * autoVerify Skip the user verification on sandbox ONLY.
     * @return A BitPay generated Invoice object.
     */
    updateInvoice(invoiceId: string, params: []): Promise<InvoiceInterface>;
    /**
     * Delete a previously created BitPay invoice.
     *
     * @param invoiceId The Id of the BitPay invoice to be canceled.
     * @param forceCancel Force cancel.
     * @return A BitPay generated Invoice object.
     */
    cancelInvoice(invoiceId: string, forceCancel?: boolean): Promise<InvoiceInterface>;
    /**
     * Cancellation will require EITHER an SMS or E-mail to have already been set if the invoice has proceeded to
     * the point where it may have been paid, unless using forceCancel parameter.
     * @param guid GUID A passthru variable provided by the merchant and designed to be used by the merchant to
     *             correlate the invoice with an order ID in their system, which can be used as a lookup variable
     *             in Retrieve Invoice by GUID.
     * @param forceCancel If 'true' it will cancel the invoice even if no contact information is present.
     * @return Invoice Invoice
     */
    cancelInvoiceByGuid(guid: string, forceCancel?: boolean): Promise<InvoiceInterface>;
    /**
     * The intent of this call is to address issues when BitPay sends a webhook but the client doesn't receive it,
     * so the client can request that BitPay resend it.
     * @param invoiceId The id of the invoice for which you want the last webhook to be resent.
     * @return Boolean status of request
     */
    requestInvoiceWebhookToBeResent(invoiceId: string): Promise<boolean>;
    /**
     * Create a refund for a BitPay invoice.
     * @param refund. Parameters from Refund object used in request:
     * invoiceId          The BitPay invoice Id having the associated refund to be created.
     * amount             Amount to be refunded in the currency indicated.
     * preview            Whether to create the refund request as a preview (which will not be acted on until status is updated)
     * immediate          Whether funds should be removed from merchant ledger immediately on submission or at time of processing
     * buyerPaysRefundFee Whether the buyer should pay the refund fee (default is merchant)
     * reference          Present only if specified. Used as reference label for the refund. Max str length = 100
     * guid               Variable provided by the merchant and designed to be used by the merchant to correlate the refund with a refund ID in their system
     * @return An updated Refund Object
     */
    createRefund(refund: RefundInterface): Promise<RefundInterface>;
    /**
     * Retrieve a previously made refund request on a BitPay invoice.
     *
     * @param refundId The BitPay refund ID.
     * @return A BitPay Refund object with the associated Refund object.
     */
    getRefund(refundId: string): Promise<RefundInterface>;
    /**
     * Retrieve a previously made refund request on a BitPay invoice.
     *
     * @param guid The BitPay refund GUID.
     * @return A BitPay Refund object with the associated Refund object.
     */
    getRefundByGuid(guid: string): Promise<RefundInterface>;
    /**
     * Retrieve all refund requests on a BitPay invoice.
     *
     * @param invoiceId The BitPay invoice object having the associated refunds.
     * @return A list of BitPay Refund objects with the associated Refund objects.
     */
    getRefunds(invoiceId: string): Promise<RefundInterface[]>;
    /**
     * Update the status of a BitPay invoice.
     *
     * @param refundId A BitPay refund ID.
     * @param status   The new status for the refund to be updated.
     * @return A BitPay generated Refund object.
     */
    updateRefund(refundId: string, status: string): Promise<RefundInterface>;
    /**
     * Update the status of a BitPay invoice.
     *
     * @param guid A BitPay refund Guid.
     * @param status   The new status for the refund to be updated.
     * @return A BitPay generated Refund object.
     */
    updateRefundByGuid(guid: string, status: string): Promise<RefundInterface>;
    /**
     * Send a refund notification.
     *
     * @param refundId A BitPay refund ID.
     * @return An updated Refund Object
     */
    sendRefundNotification(refundId: string): Promise<boolean>;
    /**
     * Cancel a previously submitted refund request on a BitPay invoice.
     *
     * @param refundId The refund Id for the refund to be canceled.
     * @return An updated Refund Object.
     */
    cancelRefund(refundId: string): Promise<RefundInterface>;
    /**
     * Cancel a previously submitted refund request on a BitPay invoice.
     *
     * @param guid The refund Guid for the refund to be canceled.
     * @return An updated Refund Object.
     */
    cancelRefundByGuid(guid: string): Promise<RefundInterface>;
    /**
     * Submit BitPay Payout Recipients.
     *
     * @param recipients PayoutRecipients A PayoutRecipients object with request parameters defined.
     * @return array A list of BitPay PayoutRecipients objects.
     */
    submitPayoutRecipients(recipients: PayoutRecipients): Promise<PayoutRecipientInterface[]>;
    /**
     * Retrieve a collection of BitPay Payout Recipients.
     * @param params Available parameters:
     * status String|null The recipient status you want to query on.
     * limit  int Maximum results that the query will return (useful for
     *               paging results). result).
     * offset int Offset for paging.
     * @return array A list of BitPayRecipient objects.
     */
    getPayoutRecipients(params?: {}): Promise<PayoutRecipientInterface[]>;
    /**
     * Retrieve a BitPay payout recipient by batch id using.  The client must have been previously authorized for the
     * payout facade.
     *
     * @param recipientId String The id of the recipient to retrieve.
     * @return PayoutRecipient A BitPay PayoutRecipient object.
     */
    getPayoutRecipient(recipientId: string): Promise<PayoutRecipientInterface>;
    /**
     * Update a Payout Recipient.
     *
     * @param recipientId String The recipient id for the recipient to be updated.
     * @param recipient   PayoutRecipients A PayoutRecipient object with updated
     *                    parameters defined.
     * @return PayoutRecipientInterface The updated recipient object.
     */
    updatePayoutRecipient(recipientId: string, recipient: PayoutRecipientInterface): Promise<PayoutRecipientInterface>;
    /**
     * Cancel a BitPay Payout recipient.
     *
     * @param recipientId String The id of the recipient to cancel.
     * @return Boolean True if the delete operation was successful, false otherwise.
     */
    deletePayoutRecipient(recipientId: string): Promise<boolean>;
    /**
     * Request a payout recipient notification
     *
     * @param recipientId String A BitPay recipient ID.
     * @return Boolean True if the notification was successfully sent, false otherwise.
     */
    requestPayoutRecipientNotification(recipientId: string): Promise<boolean>;
    /**
     * Submit a BitPay Payout.
     *
     * @param payout Payout A Payout object with request parameters defined.
     * @return PayoutInterface A BitPay generated Payout object.
     */
    submitPayout(payout: PayoutInterface): Promise<PayoutInterface>;
    /**
     * Retrieve a BitPay payout by payout id using. The client must have been
     * previously authorized for the payout facade.
     *
     * @param payoutId String The id of the payout to retrieve.
     * @return PayoutInterface BitPay Payout object.
     */
    getPayout(payoutId: string): Promise<PayoutInterface>;
    /**
     * Retrieve a collection of BitPay payouts.
     *
     * @param params Available parameters:
     * startDate String The start date for the query.
     * endDate   String The end date for the query.
     * status    String The status to filter(optional).
     * reference String The optional reference specified at payout request creation.
     * limit     int Maximum results that the query will return (useful for
     *                  paging results).
     * offset    int Offset for paging.
     * @return A list of BitPay Payout objects.
     * @param params
     */
    getPayouts(params?: {}): Promise<PayoutInterface[]>;
    /**
     * @see <a href="https://developer.bitpay.com/reference/create-payout-group">Create Payout Group</>
     *
     * @param payouts
     */
    submitPayouts(payouts: PayoutInterface[]): Promise<PayoutGroupInterface>;
    /**
     * @see <a href="https://developer.bitpay.com/reference/cancel-a-payout-group">Cancel a Payout Group</>
     *
     * @param payoutGroupId
     */
    cancelPayouts(payoutGroupId: string): Promise<PayoutGroupInterface>;
    /**
     * Request a payout notification
     *
     * @param payoutId String The id of the payout to notify..
     * @return Boolean True if the notification was successfully sent, false otherwise.
     */
    requestPayoutNotification(payoutId: string): Promise<boolean>;
    /**
     * Cancel a BitPay Payout.
     *
     * @param payoutId String The id of the payout to cancel.
     * @return Boolean True if the refund was successfully canceled, false otherwise.
     */
    cancelPayout(payoutId: string): Promise<boolean>;
    /**
     * Retrieve a list of ledgers using the merchant facade.
     *
     * @return array A list of Ledger objects populated with the currency and current balance of each one.
     */
    getLedgers(): Promise<LedgerInterface[]>;
    /**
     * Retrieve a list of ledgers entries by currency and date range using the merchant facade.
     *
     * @param currency  The three digit currency string for the ledger to retrieve.
     * @param dateStart The first date for the query filter.
     * @param dateEnd   The last date for the query filter.
     * @return array Ledger entries list.
     */
    getLedgerEntries(currency: string, dateStart: Date | null, dateEnd: Date | null): Promise<LedgerEntryInterface[]>;
    /**
     * Create a BitPay Bill.
     *
     * @param bill        A Bill object with request parameters defined.
     * @param facade      The facade used to create it.
     * @param signRequest Signed request.
     * @return BillInterface A BitPay generated Bill object.
     */
    createBill(bill: BillInterface, facade?: Facade, signRequest?: boolean): Promise<BillInterface>;
    /**
     * Retrieve a BitPay bill by bill id using the specified facade.
     *
     * @param billId      The id of the bill to retrieve.
     * @param facade      The facade used to retrieve it.
     * @param signRequest Signed request.
     * @return BillInterface A BitPay Bill object.
     */
    getBill(billId: string, facade?: Facade, signRequest?: boolean): Promise<BillInterface>;
    /**
     * Retrieve a collection of BitPay bills.
     *
     * @param status The status to filter the bills.
     * @return BillInterface A list of BitPay Bill objects.
     */
    getBills(status: string | null): Promise<BillInterface>;
    /**
     * Update a BitPay Bill.
     *
     * @param bill   A Bill object with the parameters to update defined.
     * @param billId The Id of the Bill to udpate.
     * @return BillInterface An updated Bill object.
     */
    updateBill(bill: BillInterface, billId: string): Promise<BillInterface>;
    /**
     * Deliver a BitPay Bill.
     *
     * @param billId    The id of the requested bill.
     * @param billToken The token of the requested bill.
     * @return Boolean A response status returned from the API.
     */
    deliverBill(billId: string, billToken: string): Promise<boolean>;
    /**
     * Retrieve all supported wallets.
     *
     * @return array A list of wallet objets.
     */
    getSupportedWallets(): Promise<WalletInterface[]>;
    /**
     * Retrieves a summary of the specified settlement.
     *
     * @param settlementId Settlement Id.
     * @return SettlementInterface A BitPay Settlement object.
     */
    getSettlement(settlementId: string): Promise<SettlementInterface>;
    /**
     * Retrieves settlement reports for the calling merchant filtered by query.
     * The `limit` and `offset` parameters
     * specify pages for large query sets.
     * @params params Available params:
     * currency  The three digit currency string for the ledger to retrieve.
     * dateStart The start date for the query.
     * dateEnd   The end date for the query.
     * status    Can be `processing`, `completed`, or `failed`.
     * limit     Maximum number of settlements to retrieve.
     * offset    Offset for paging.
     * @return array A list of BitPay Settlement objects.
     */
    getSettlements(params?: {}): Promise<SettlementInterface[]>;
    /**
     * Gets a detailed reconciliation report of the activity within the settlement period.
     * Required id and settlement token.
     *
     * @param settlementId Settlement ID.
     * @param token Settlement token.
     * @return SettlementInterface A detailed BitPay Settlement object.
     */
    getSettlementReconciliationReport(settlementId: string, token: string): Promise<SettlementInterface>;
    /**
     * Gets info for specific currency.
     *
     * @param currencyCode String Currency code for which the info will be retrieved.
     * @return CurrencyInterface Currency info.
     */
    getCurrencyInfo(currencyCode: string): Promise<CurrencyInterface>;
    private getEcKeyByPrivateKey;
    private getEcKeyByConfig;
    private static getBaseUrl;
    private getIdentity;
    private createRateClient;
    private getCurrencyClient;
    private createInvoiceClient;
    private createRefundClient;
    private createPayoutRecipientClient;
    private createPayoutClient;
    private createLedgerClient;
    private createBillClient;
    private createWalletClient;
    private createSettlementClient;
    private getFacadeBasedOnTokenContainer;
    private static isSignRequest;
    private static getDateAsString;
    private initByConfigFilePath;
    private initForTests;
}
