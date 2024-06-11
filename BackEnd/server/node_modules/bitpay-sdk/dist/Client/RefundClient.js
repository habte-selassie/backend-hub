"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundClient = void 0;
const index_1 = require("../index");
const ParamsRemover_1 = require("../util/ParamsRemover");
const BitPayResponseParser_1 = require("../util/BitPayResponseParser");
class RefundClient {
    constructor(bitPayClient, tokenContainer, guidGenerator) {
        this.bitPayClient = bitPayClient;
        this.tokenContainer = tokenContainer;
        this.guidGenerator = guidGenerator;
    }
    /**
     * Create a refund for a BitPay invoice.
     *
     * @param refund RefundInterface
     * @returns Refund An updated Refund Object
     * @throws RefundCreationException
     */
    async create(refund) {
        const params = {
            token: this.tokenContainer.getToken(index_1.Facade.Merchant),
            invoiceId: refund.invoice,
            amount: refund.amount,
            currency: refund.currency,
            preview: refund.preview,
            immediate: refund.immediate,
            buyerPaysRefundFee: refund.buyerPaysRefundFee
        };
        params['guid'] = refund.guid ? refund.guid : this.guidGenerator.execute();
        ParamsRemover_1.ParamsRemover.removeNullValuesFromObject(params);
        try {
            const result = await this.bitPayClient.post('refunds', params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.RefundCreation('failed to deserialize BitPay server response (Refund) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Retrieve a previously made refund request on a BitPay invoice.
     *
     * @param refundId The BitPay refund ID.
     * @returns Refund BitPay Refund object with the associated Refund object.
     * @throws RefundQueryException
     */
    async get(refundId) {
        const params = { token: this.tokenContainer.getToken(index_1.Facade.Merchant) };
        try {
            const result = await this.bitPayClient.get('refunds/' + refundId, params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.RefundQuery('failed to deserialize BitPay server response (Refund) : ' + e.message, e.apiCode);
        }
    }
    async getByGuid(guid) {
        const params = { token: this.tokenContainer.getToken(index_1.Facade.Merchant) };
        try {
            const result = await this.bitPayClient.get('refunds/guid/' + guid, params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.RefundQuery('failed to deserialize BitPay server response (Refund) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Retrieve a previously made refund request on a BitPay invoice by guid.
     *
     * @param invoiceId The BitPay refund Guid.
     * @returns Refund BitPay Refund object with the associated Refund object.
     * @throws RefundQueryException
     */
    async getRefunds(invoiceId) {
        const params = {
            token: this.tokenContainer.getToken(index_1.Facade.Merchant),
            invoiceId: invoiceId
        };
        try {
            const result = await this.bitPayClient.get('refunds', params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.RefundQuery('failed to deserialize BitPay server response (Refund) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Send a refund notification.
     *
     * @param refundId A BitPay refund ID.
     * @returns boolean An updated Refund Object
     * @throws RefundException
     */
    async sendRefundNotification(refundId) {
        const params = { token: this.tokenContainer.getToken(index_1.Facade.Merchant) };
        try {
            const result = await this.bitPayClient.post('refunds/' + refundId + '/notifications', params, true);
            return BitPayResponseParser_1.BitPayResponseParser.jsonToBoolean(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.RefundGeneric('failed to deserialize BitPay server response (Refund) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Update the status of a BitPay invoice.
     *
     * @param refundId BitPay refund ID.
     * @param status The new status for the refund to be updated.
     * @returns Refund A BitPay generated Refund object.
     * @throws RefundException
     */
    async update(refundId, status) {
        const params = {
            token: this.tokenContainer.getToken(index_1.Facade.Merchant),
            status: status
        };
        try {
            const result = await this.bitPayClient.put('refunds/' + refundId, params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.RefundGeneric('failed to deserialize BitPay server response (Refund) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Update the status of a BitPay invoice.
     *
     * @param guid BitPay refund Guid.
     * @param status The new status for the refund to be updated.
     * @returns  Refund A BitPay generated Refund object.
     * @throws RefundException
     */
    async updateByGuid(guid, status) {
        const params = {
            token: this.tokenContainer.getToken(index_1.Facade.Merchant),
            status: status
        };
        try {
            const result = await this.bitPayClient.put('refunds/guid/' + guid, params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.RefundGeneric('failed to deserialize BitPay server response (Refund) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Cancel a previously submitted refund request on a BitPay invoice.
     *
     * @param refundId The refund Id for the refund to be canceled.
     * @returns Cancelled refund Object.
     * @throws RefundCreationException
     */
    async cancel(refundId) {
        const params = { token: this.tokenContainer.getToken(index_1.Facade.Merchant) };
        try {
            const result = await this.bitPayClient.delete('refunds/' + refundId, params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.RefundCancellation('failed to deserialize BitPay server response (Refund) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Cancel a previously submitted refund request on a BitPay invoice
     *
     * @param guid The refund Guid for the refund to be canceled.
     * @returns Cancelled refund Object.
     * @throws RefundCreationException
     */
    async cancelByGuid(guid) {
        const params = { token: this.tokenContainer.getToken(index_1.Facade.Merchant) };
        try {
            const result = await this.bitPayClient.delete('refunds/guid/' + guid, params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.RefundCancellation('failed to deserialize BitPay server response (Refund) : ' + e.message, e.apiCode);
        }
    }
}
exports.RefundClient = RefundClient;
//# sourceMappingURL=RefundClient.js.map