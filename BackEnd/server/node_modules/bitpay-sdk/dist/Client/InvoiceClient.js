"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceClient = void 0;
const index_1 = require("../index");
const BitPayResponseParser_1 = require("../util/BitPayResponseParser");
class InvoiceClient {
    constructor(bitPayClient, tokenContainer, guidGenerator) {
        this.bitPayClient = bitPayClient;
        this.tokenContainer = tokenContainer;
        this.guidGenerator = guidGenerator;
    }
    /**
     * Create a BitPay invoice.
     *
     * @param invoice An Invoice object with request parameters defined
     * @param facade The facade used to create it.
     * @param signRequest Signed request.
     * @returns Invoice
     * @throws InvoiceCreationException.
     */
    async create(invoice, facade, signRequest) {
        invoice.guid = invoice.guid ? invoice.guid : this.guidGenerator.execute();
        invoice.token = this.tokenContainer.getToken(facade);
        try {
            const result = await this.bitPayClient.post('invoices', invoice, signRequest);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.InvoiceCreation('failed to deserialize BitPay server response (Invoice) : ' + e.message, e.apiCode);
        }
    }
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
    async get(invoiceId, facade, signRequest) {
        const params = { token: this.tokenContainer.getToken(facade) };
        try {
            const result = await this.bitPayClient.get('invoices/' + invoiceId, params, signRequest);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.InvoiceQuery('failed to deserialize BitPay server response (Invoice) : ' + e.message, e.apiCode);
        }
    }
    /**
     * @param guid
     * @param facade
     * @param signRequest
     * @returns Invoice
     * @throws InvoiceQueryException
     */
    async getByGuid(guid, facade, signRequest) {
        const params = { token: this.tokenContainer.getToken(facade) };
        try {
            const result = await this.bitPayClient.get('invoices/guid/' + guid, params, signRequest);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.InvoiceQuery('failed to deserialize BitPay server response (Invoice) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Retrieve a collection of BitPay invoices.
     *
     * @param params
     * @returns Invoice[]
     * @throws InvoiceQueryException
     */
    async getInvoices(params) {
        params['token'] = this.tokenContainer.getToken(index_1.Facade.Merchant);
        try {
            const result = await this.bitPayClient.get('invoices', params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.InvoiceQuery('failed to deserialize BitPay server response (Invoice) : ' + e.message, e.apiCode);
        }
    }
    /**
     *
     * @param invoiceId
     * @returns
     */
    async getInvoiceEventToken(invoiceId) {
        const params = {};
        params['token'] = this.tokenContainer.getToken(index_1.Facade.Merchant);
        try {
            const result = await this.bitPayClient.get('invoices/' + invoiceId + '/events', params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.InvoiceQuery('failed to deserialize BitPay server response (Invoice) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Update a BitPay invoice.
     *
     * @param invoiceId The id of the invoice to updated.
     * @param params
     * @returns Invoice
     * @throws InvoiceUpdateException
     */
    async update(invoiceId, params) {
        params['token'] = this.tokenContainer.getToken(index_1.Facade.Merchant);
        try {
            const result = await this.bitPayClient.put('invoices/' + invoiceId, params);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.InvoiceUpdate('failed to deserialize BitPay server response (Invoice) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Pay an invoice with a mock transaction
     *
     * @param invoiceId The id of the invoice.
     * @param status  Status the invoice will become. Acceptable values are confirmed (default) and complete.
     * @returns Invoice Invoice object.
     * @throws BitPayException
     */
    async pay(invoiceId, status) {
        const params = {
            token: this.tokenContainer.getToken(index_1.Facade.Merchant),
            status: status
        };
        try {
            const result = await this.bitPayClient.put('invoices/pay/' + invoiceId, params);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.InvoiceGeneric('failed to deserialize BitPay server response (Invoice) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Cancel a BitPay invoice.
     *
     * @param invoiceId The id of the invoice to updated.
     * @param forceCancel
     * @returns Invoice  Cancelled invoice object.
     * @throws BitPayException
     */
    async cancel(invoiceId, forceCancel) {
        const params = {
            token: this.tokenContainer.getToken(index_1.Facade.Merchant),
            forceCancel: forceCancel
        };
        try {
            const result = await this.bitPayClient.delete('invoices/' + invoiceId, params);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.InvoiceGeneric('failed to deserialize BitPay server response (Invoice) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Cancel a BitPay invoice.
     *
     * @param guid The guid of the invoice to cancel.
     * @param forceCancel
     * @returns Invoice Cancelled invoice object.
     * @throws BitPayException
     */
    async cancelByGuid(guid, forceCancel) {
        const params = {
            token: this.tokenContainer.getToken(index_1.Facade.Merchant),
            forceCancel: forceCancel
        };
        try {
            const result = await this.bitPayClient.delete('invoices/guid/' + guid, params);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.InvoiceGeneric('failed to deserialize BitPay server response (Invoice) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Request a BitPay Invoice Webhook.
     *
     * @param invoiceId A BitPay invoice ID.
     * @returns boolean
     * @throws BitPayException
     */
    async requestInvoiceWebhookToBeResent(invoiceId) {
        const params = { token: this.tokenContainer.getToken(index_1.Facade.Merchant) };
        try {
            const result = await this.bitPayClient.post('invoices/' + invoiceId + '/notifications', params);
            return BitPayResponseParser_1.BitPayResponseParser.jsonToBoolean(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.InvoiceGeneric('failed to deserialize BitPay server response (Invoice) : ' + e.message, e.apiCode);
        }
    }
}
exports.InvoiceClient = InvoiceClient;
//# sourceMappingURL=InvoiceClient.js.map