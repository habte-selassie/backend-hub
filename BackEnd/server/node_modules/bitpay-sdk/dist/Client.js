"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const index_1 = require("./index");
const BitPayClient_1 = require("./Client/BitPayClient");
const TokenContainer_1 = require("./TokenContainer");
const Environment_1 = require("./Environment");
const BitPayException_1 = require("./Exceptions/BitPayException");
const GuidGenerator_1 = require("./util/GuidGenerator");
const RateClient_1 = require("./Client/RateClient");
const CurrencyClient_1 = require("./Client/CurrencyClient");
const InvoiceClient_1 = require("./Client/InvoiceClient");
const RefundClient_1 = require("./Client/RefundClient");
const PayoutRecipientClient_1 = require("./Client/PayoutRecipientClient");
const PayoutClient_1 = require("./Client/PayoutClient");
const LedgerClient_1 = require("./Client/LedgerClient");
const ParamsRemover_1 = require("./util/ParamsRemover");
const BillClient_1 = require("./Client/BillClient");
const WalletClient_1 = require("./Client/WalletClient");
const SettlementClient_1 = require("./Client/SettlementClient");
const PosToken_1 = require("./PosToken");
const PrivateKey_1 = require("./PrivateKey");
const fs = require("fs");
class Client {
    constructor(configFilePath, privateKey, tokenContainer, identity, posToken, environment, bitPayClient, // using for tests
    guidGenerator // using for tests
    ) {
        this.keyUtils = new index_1.KeyUtils();
        if (configFilePath !== null) {
            this.initByConfigFilePath(configFilePath);
            return;
        }
        if (bitPayClient !== undefined && bitPayClient !== null) {
            // using for tests
            this.initForTests(bitPayClient, guidGenerator, tokenContainer);
            return;
        }
        if (tokenContainer === null) {
            tokenContainer = new TokenContainer_1.TokenContainer();
        }
        if (environment === undefined) {
            environment = Environment_1.Environment.Prod;
        }
        if (privateKey !== null) {
            const ecKey = this.getEcKeyByPrivateKey(privateKey);
            this.guidGenerator = new GuidGenerator_1.GuidGenerator();
            this.tokenContainer = tokenContainer;
            this.bitPayClient = new BitPayClient_1.BitPayClient(Client.getBaseUrl(environment), ecKey, this.getIdentity(ecKey));
            return;
        }
        this.tokenContainer = tokenContainer;
        this.guidGenerator = new GuidGenerator_1.GuidGenerator();
        this.bitPayClient = new BitPayClient_1.BitPayClient(Client.getBaseUrl(environment), null, null);
        if (posToken !== null) {
            this.tokenContainer.addPos(posToken.getValue());
            return;
        }
    }
    /**
     * Client factory for POS
     * @param posToken
     * @param environment
     */
    static createPosClient(posToken, environment) {
        return new Client(null, null, null, null, new PosToken_1.PosToken(posToken), environment);
    }
    /**
     * Client factory based on config file
     *
     * @param configFilePath
     */
    static createClientByConfig(configFilePath) {
        return new Client(configFilePath, null, null, null, null, null);
    }
    /**
     * Client factory based on private key and tokens
     * @param privateKey
     * @param tokenContainer
     * @param environment
     */
    static createClientByPrivateKey(privateKey, tokenContainer, environment) {
        return new Client(null, new PrivateKey_1.PrivateKey(privateKey), tokenContainer, null, null, environment);
    }
    getToken(facade) {
        return this.tokenContainer.getToken(facade);
    }
    /**
     * Retrieve the rates for a cryptocurrency / fiat pair. See https://bitpay.com/bitcoin-exchange-rates.
     *
     * @param baseCurrency the cryptocurrency for which you want to fetch the rates.
     *                     Current supported values are BTC and BCH.
     * @param currency the fiat currency for which you want to fetch the baseCurrency rates
     * @return A Rate object populated with the BitPay exchange rate table.
     */
    async getRate(baseCurrency, currency) {
        return this.createRateClient().getRate(baseCurrency, currency);
    }
    /**
     * Retrieve the exchange rate table maintained by BitPay.  See https://bitpay.com/bitcoin-exchange-rates.
     * @param currency the cryptocurrency for which you want to fetch the rates.
     *                     Current supported values are BTC and BCH.
     * @return A Rates object populated with the BitPay exchange rate table.
     */
    async getRates(currency = null) {
        return this.createRateClient().getRates(currency);
    }
    /**
     * Create a BitPay invoice using the Merchant facade.
     *
     * @param invoice An Invoice object with request parameters defined.
     * @param facade Facade for request.
     * @param signRequest Signed request.
     */
    async createInvoice(invoice, facade, signRequest) {
        if (facade === undefined) {
            facade = this.getFacadeBasedOnTokenContainer();
        }
        if (signRequest === undefined) {
            signRequest = Client.isSignRequest(facade);
        }
        invoice.token = invoice.token ? invoice.token : this.guidGenerator.execute();
        return this.createInvoiceClient().create(invoice, facade, signRequest);
    }
    /**
     * Retrieve a BitPay invoice by invoice id using the public facade.
     *
     * @param invoiceId The id of the invoice to retrieve.
     * @param facade Facade for request.
     * @param signRequest Signed request.
     */
    async getInvoice(invoiceId, facade, signRequest) {
        if (facade === undefined) {
            facade = this.getFacadeBasedOnTokenContainer();
        }
        if (signRequest === undefined) {
            signRequest = Client.isSignRequest(facade);
        }
        return this.createInvoiceClient().get(invoiceId, facade, signRequest);
    }
    /**
     * Retrieve a BitPay invoice by guid using the specified facade.
     * The client must have been previously authorized for the specified facade.
     *
     * @param guid The guid of the invoice to retrieve.
     * @param facade Facade for request.
     * @param signRequest Signed request.
     */
    async getInvoiceByGuid(guid, facade, signRequest) {
        if (facade === undefined) {
            facade = this.getFacadeBasedOnTokenContainer();
        }
        if (signRequest === undefined) {
            signRequest = Client.isSignRequest(facade);
        }
        return this.createInvoiceClient().getByGuid(guid, facade, signRequest);
    }
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
    async getInvoices(params) {
        return this.createInvoiceClient().getInvoices(params);
    }
    /**
     * Retrieves a bus token which can be used to subscribe to invoice events.
     *
     * @param invoiceId the id of the invoice for which you want to fetch an event token.
     */
    async getInvoiceEventToken(invoiceId) {
        return this.createInvoiceClient().getInvoiceEventToken(invoiceId);
    }
    /**
     * Pay a BitPay invoice with a mock transaction. Available only on test env.
     *
     * @param invoiceId The id of the invoice to updated.
     * @param status    The status of the invoice to be updated, can be "confirmed" or "complete".
     * @return A BitPay generated Invoice object.
     */
    async payInvoice(invoiceId, status) {
        return this.createInvoiceClient().pay(invoiceId, status);
    }
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
    async updateInvoice(invoiceId, params) {
        return this.createInvoiceClient().update(invoiceId, params);
    }
    /**
     * Delete a previously created BitPay invoice.
     *
     * @param invoiceId The Id of the BitPay invoice to be canceled.
     * @param forceCancel Force cancel.
     * @return A BitPay generated Invoice object.
     */
    async cancelInvoice(invoiceId, forceCancel = true) {
        return this.createInvoiceClient().cancel(invoiceId, forceCancel);
    }
    /**
     * Cancellation will require EITHER an SMS or E-mail to have already been set if the invoice has proceeded to
     * the point where it may have been paid, unless using forceCancel parameter.
     * @param guid GUID A passthru variable provided by the merchant and designed to be used by the merchant to
     *             correlate the invoice with an order ID in their system, which can be used as a lookup variable
     *             in Retrieve Invoice by GUID.
     * @param forceCancel If 'true' it will cancel the invoice even if no contact information is present.
     * @return Invoice Invoice
     */
    async cancelInvoiceByGuid(guid, forceCancel = true) {
        return this.createInvoiceClient().cancelByGuid(guid, forceCancel);
    }
    /**
     * The intent of this call is to address issues when BitPay sends a webhook but the client doesn't receive it,
     * so the client can request that BitPay resend it.
     * @param invoiceId The id of the invoice for which you want the last webhook to be resent.
     * @return Boolean status of request
     */
    async requestInvoiceWebhookToBeResent(invoiceId) {
        return this.createInvoiceClient().requestInvoiceWebhookToBeResent(invoiceId);
    }
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
    async createRefund(refund) {
        return this.createRefundClient().create(refund);
    }
    /**
     * Retrieve a previously made refund request on a BitPay invoice.
     *
     * @param refundId The BitPay refund ID.
     * @return A BitPay Refund object with the associated Refund object.
     */
    async getRefund(refundId) {
        return this.createRefundClient().get(refundId);
    }
    /**
     * Retrieve a previously made refund request on a BitPay invoice.
     *
     * @param guid The BitPay refund GUID.
     * @return A BitPay Refund object with the associated Refund object.
     */
    async getRefundByGuid(guid) {
        return this.createRefundClient().getByGuid(guid);
    }
    /**
     * Retrieve all refund requests on a BitPay invoice.
     *
     * @param invoiceId The BitPay invoice object having the associated refunds.
     * @return A list of BitPay Refund objects with the associated Refund objects.
     */
    async getRefunds(invoiceId) {
        return this.createRefundClient().getRefunds(invoiceId);
    }
    /**
     * Update the status of a BitPay invoice.
     *
     * @param refundId A BitPay refund ID.
     * @param status   The new status for the refund to be updated.
     * @return A BitPay generated Refund object.
     */
    async updateRefund(refundId, status) {
        return this.createRefundClient().update(refundId, status);
    }
    /**
     * Update the status of a BitPay invoice.
     *
     * @param guid A BitPay refund Guid.
     * @param status   The new status for the refund to be updated.
     * @return A BitPay generated Refund object.
     */
    async updateRefundByGuid(guid, status) {
        return this.createRefundClient().updateByGuid(guid, status);
    }
    /**
     * Send a refund notification.
     *
     * @param refundId A BitPay refund ID.
     * @return An updated Refund Object
     */
    async sendRefundNotification(refundId) {
        return this.createRefundClient().sendRefundNotification(refundId);
    }
    /**
     * Cancel a previously submitted refund request on a BitPay invoice.
     *
     * @param refundId The refund Id for the refund to be canceled.
     * @return An updated Refund Object.
     */
    async cancelRefund(refundId) {
        return this.createRefundClient().cancel(refundId);
    }
    /**
     * Cancel a previously submitted refund request on a BitPay invoice.
     *
     * @param guid The refund Guid for the refund to be canceled.
     * @return An updated Refund Object.
     */
    async cancelRefundByGuid(guid) {
        return this.createRefundClient().cancelByGuid(guid);
    }
    /**
     * Submit BitPay Payout Recipients.
     *
     * @param recipients PayoutRecipients A PayoutRecipients object with request parameters defined.
     * @return array A list of BitPay PayoutRecipients objects.
     */
    async submitPayoutRecipients(recipients) {
        return this.createPayoutRecipientClient().submit(recipients);
    }
    /**
     * Retrieve a collection of BitPay Payout Recipients.
     * @param params Available parameters:
     * status String|null The recipient status you want to query on.
     * limit  int Maximum results that the query will return (useful for
     *               paging results). result).
     * offset int Offset for paging.
     * @return array A list of BitPayRecipient objects.
     */
    async getPayoutRecipients(params = {}) {
        return this.createPayoutRecipientClient().getByFilters(params);
    }
    /**
     * Retrieve a BitPay payout recipient by batch id using.  The client must have been previously authorized for the
     * payout facade.
     *
     * @param recipientId String The id of the recipient to retrieve.
     * @return PayoutRecipient A BitPay PayoutRecipient object.
     */
    async getPayoutRecipient(recipientId) {
        return this.createPayoutRecipientClient().get(recipientId);
    }
    /**
     * Update a Payout Recipient.
     *
     * @param recipientId String The recipient id for the recipient to be updated.
     * @param recipient   PayoutRecipients A PayoutRecipient object with updated
     *                    parameters defined.
     * @return PayoutRecipientInterface The updated recipient object.
     */
    async updatePayoutRecipient(recipientId, recipient) {
        return this.createPayoutRecipientClient().update(recipientId, recipient);
    }
    /**
     * Cancel a BitPay Payout recipient.
     *
     * @param recipientId String The id of the recipient to cancel.
     * @return Boolean True if the delete operation was successful, false otherwise.
     */
    async deletePayoutRecipient(recipientId) {
        return this.createPayoutRecipientClient().delete(recipientId);
    }
    /**
     * Request a payout recipient notification
     *
     * @param recipientId String A BitPay recipient ID.
     * @return Boolean True if the notification was successfully sent, false otherwise.
     */
    async requestPayoutRecipientNotification(recipientId) {
        return this.createPayoutRecipientClient().requestNotification(recipientId);
    }
    /**
     * Submit a BitPay Payout.
     *
     * @param payout Payout A Payout object with request parameters defined.
     * @return PayoutInterface A BitPay generated Payout object.
     */
    async submitPayout(payout) {
        return this.createPayoutClient().submit(payout);
    }
    /**
     * Retrieve a BitPay payout by payout id using. The client must have been
     * previously authorized for the payout facade.
     *
     * @param payoutId String The id of the payout to retrieve.
     * @return PayoutInterface BitPay Payout object.
     */
    async getPayout(payoutId) {
        return this.createPayoutClient().get(payoutId);
    }
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
    async getPayouts(params = {}) {
        return this.createPayoutClient().getPayouts(params);
    }
    /**
     * @see <a href="https://developer.bitpay.com/reference/create-payout-group">Create Payout Group</>
     *
     * @param payouts
     */
    async submitPayouts(payouts) {
        return this.createPayoutClient().submitPayouts(payouts);
    }
    /**
     * @see <a href="https://developer.bitpay.com/reference/cancel-a-payout-group">Cancel a Payout Group</>
     *
     * @param payoutGroupId
     */
    async cancelPayouts(payoutGroupId) {
        return this.createPayoutClient().cancelPayouts(payoutGroupId);
    }
    /**
     * Request a payout notification
     *
     * @param payoutId String The id of the payout to notify..
     * @return Boolean True if the notification was successfully sent, false otherwise.
     */
    async requestPayoutNotification(payoutId) {
        return this.createPayoutClient().requestNotification(payoutId);
    }
    /**
     * Cancel a BitPay Payout.
     *
     * @param payoutId String The id of the payout to cancel.
     * @return Boolean True if the refund was successfully canceled, false otherwise.
     */
    async cancelPayout(payoutId) {
        return this.createPayoutClient().cancel(payoutId);
    }
    /**
     * Retrieve a list of ledgers using the merchant facade.
     *
     * @return array A list of Ledger objects populated with the currency and current balance of each one.
     */
    async getLedgers() {
        return this.createLedgerClient().getLedgers();
    }
    /**
     * Retrieve a list of ledgers entries by currency and date range using the merchant facade.
     *
     * @param currency  The three digit currency string for the ledger to retrieve.
     * @param dateStart The first date for the query filter.
     * @param dateEnd   The last date for the query filter.
     * @return array Ledger entries list.
     */
    async getLedgerEntries(currency, dateStart, dateEnd) {
        const params = ParamsRemover_1.ParamsRemover.removeNullValuesFromObject({
            startDate: Client.getDateAsString(dateStart),
            endDate: Client.getDateAsString(dateEnd)
        });
        return this.createLedgerClient().getEntries(currency, params);
    }
    /**
     * Create a BitPay Bill.
     *
     * @param bill        A Bill object with request parameters defined.
     * @param facade      The facade used to create it.
     * @param signRequest Signed request.
     * @return BillInterface A BitPay generated Bill object.
     */
    async createBill(bill, facade, signRequest) {
        if (facade === undefined) {
            facade = this.getFacadeBasedOnTokenContainer();
        }
        if (signRequest === undefined) {
            signRequest = Client.isSignRequest(facade);
        }
        return this.createBillClient().create(bill, facade, signRequest);
    }
    /**
     * Retrieve a BitPay bill by bill id using the specified facade.
     *
     * @param billId      The id of the bill to retrieve.
     * @param facade      The facade used to retrieve it.
     * @param signRequest Signed request.
     * @return BillInterface A BitPay Bill object.
     */
    async getBill(billId, facade, signRequest) {
        if (facade === undefined) {
            facade = this.getFacadeBasedOnTokenContainer();
        }
        if (signRequest === undefined) {
            signRequest = Client.isSignRequest(facade);
        }
        return this.createBillClient().get(billId, facade, signRequest);
    }
    /**
     * Retrieve a collection of BitPay bills.
     *
     * @param status The status to filter the bills.
     * @return BillInterface A list of BitPay Bill objects.
     */
    async getBills(status) {
        return this.createBillClient().getBills(status);
    }
    /**
     * Update a BitPay Bill.
     *
     * @param bill   A Bill object with the parameters to update defined.
     * @param billId The Id of the Bill to udpate.
     * @return BillInterface An updated Bill object.
     */
    async updateBill(bill, billId) {
        return this.createBillClient().update(bill, billId);
    }
    /**
     * Deliver a BitPay Bill.
     *
     * @param billId    The id of the requested bill.
     * @param billToken The token of the requested bill.
     * @return Boolean A response status returned from the API.
     */
    async deliverBill(billId, billToken) {
        const facade = this.getFacadeBasedOnTokenContainer();
        const signRequest = Client.isSignRequest(facade);
        return this.createBillClient().deliver(billId, billToken, signRequest);
    }
    /**
     * Retrieve all supported wallets.
     *
     * @return array A list of wallet objets.
     */
    async getSupportedWallets() {
        return this.createWalletClient().getSupportedWallets();
    }
    /**
     * Retrieves a summary of the specified settlement.
     *
     * @param settlementId Settlement Id.
     * @return SettlementInterface A BitPay Settlement object.
     */
    async getSettlement(settlementId) {
        return this.createSettlementClient().get(settlementId);
    }
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
    async getSettlements(params = {}) {
        return this.createSettlementClient().getSettlements(params);
    }
    /**
     * Gets a detailed reconciliation report of the activity within the settlement period.
     * Required id and settlement token.
     *
     * @param settlementId Settlement ID.
     * @param token Settlement token.
     * @return SettlementInterface A detailed BitPay Settlement object.
     */
    async getSettlementReconciliationReport(settlementId, token) {
        return this.createSettlementClient().getReconciliationReport(settlementId, token);
    }
    /**
     * Gets info for specific currency.
     *
     * @param currencyCode String Currency code for which the info will be retrieved.
     * @return CurrencyInterface Currency info.
     */
    async getCurrencyInfo(currencyCode) {
        return this.getCurrencyClient().getCurrencyInfo(currencyCode);
    }
    getEcKeyByPrivateKey(privateKey) {
        const value = privateKey.getValue();
        if (fs.existsSync(value)) {
            return this.keyUtils.load_keypair(fs.readFileSync(value).toString());
        }
        return this.keyUtils.load_keypair(Buffer.from(value).toString().trim());
    }
    getEcKeyByConfig(envConfig) {
        const privateKeyPath = envConfig['PrivateKeyPath'].toString().replace('"', '');
        const keyHex = envConfig['PrivateKey'].toString().replace('"', '');
        if (fs.existsSync(privateKeyPath)) {
            return this.keyUtils.load_keypair(fs.readFileSync(privateKeyPath).toString());
        }
        if (keyHex) {
            return this.keyUtils.load_keypair(Buffer.from(keyHex).toString().trim());
        }
        throw new BitPayException_1.default(null, 'Missing ECKey');
    }
    static getBaseUrl(environment) {
        return environment.toUpperCase() == index_1.Env.Test ? index_1.Env.TestUrl : index_1.Env.ProdUrl;
    }
    getIdentity(ecKey) {
        return this.keyUtils.getPublicKeyFromPrivateKey(ecKey);
    }
    createRateClient() {
        return new RateClient_1.RateClient(this.bitPayClient);
    }
    getCurrencyClient() {
        return new CurrencyClient_1.CurrencyClient(this.bitPayClient);
    }
    createInvoiceClient() {
        return new InvoiceClient_1.InvoiceClient(this.bitPayClient, this.tokenContainer, this.guidGenerator);
    }
    createRefundClient() {
        return new RefundClient_1.RefundClient(this.bitPayClient, this.tokenContainer, this.guidGenerator);
    }
    createPayoutRecipientClient() {
        return new PayoutRecipientClient_1.PayoutRecipientClient(this.bitPayClient, this.tokenContainer, this.guidGenerator);
    }
    createPayoutClient() {
        return new PayoutClient_1.PayoutClient(this.bitPayClient, this.tokenContainer, this.guidGenerator);
    }
    createLedgerClient() {
        return new LedgerClient_1.LedgerClient(this.bitPayClient, this.tokenContainer);
    }
    createBillClient() {
        return new BillClient_1.BillClient(this.bitPayClient, this.tokenContainer);
    }
    createWalletClient() {
        return new WalletClient_1.WalletClient(this.bitPayClient);
    }
    createSettlementClient() {
        return new SettlementClient_1.SettlementClient(this.bitPayClient, this.tokenContainer);
    }
    getFacadeBasedOnTokenContainer() {
        if (this.tokenContainer.isTokenExist(index_1.Facade.Merchant)) {
            return index_1.Facade.Merchant;
        }
        return index_1.Facade.Pos;
    }
    static isSignRequest(facade) {
        return facade !== index_1.Facade.Pos;
    }
    static getDateAsString(date) {
        return date.toISOString().split('T')[0];
    }
    initByConfigFilePath(configFilePath) {
        if (!fs.existsSync(configFilePath)) {
            throw new index_1.BitPayExceptions.Generic(null, 'Configuration file not found');
        }
        try {
            const configObj = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'))['BitPayConfiguration'];
            const environment = configObj['Environment'];
            const envConfig = configObj['EnvConfig'][environment];
            const tokens = envConfig['ApiTokens'];
            this.tokenContainer = new TokenContainer_1.TokenContainer(tokens);
            const ecKey = this.getEcKeyByConfig(envConfig);
            this.bitPayClient = new BitPayClient_1.BitPayClient(Client.getBaseUrl(environment), ecKey, this.getIdentity(ecKey));
            this.guidGenerator = new GuidGenerator_1.GuidGenerator();
        }
        catch (e) {
            throw new index_1.BitPayExceptions.Generic(null, 'Error when reading configuration file', null, e.apiCode);
        }
    }
    initForTests(bitPayClient, guidGenerator, tokenContainer) {
        this.bitPayClient = bitPayClient;
        this.guidGenerator = guidGenerator;
        this.tokenContainer = tokenContainer;
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map