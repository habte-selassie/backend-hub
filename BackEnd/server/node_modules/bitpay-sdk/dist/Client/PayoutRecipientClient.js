"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutRecipientClient = void 0;
const index_1 = require("../index");
const BitPayResponseParser_1 = require("../util/BitPayResponseParser");
class PayoutRecipientClient {
    constructor(bitPayClient, tokenContainer, guidGenerator) {
        this.bitPayClient = bitPayClient;
        this.tokenContainer = tokenContainer;
        this.guidGenerator = guidGenerator;
    }
    /**
     * Submit BitPay Payout Recipients.
     *
     * @param recipients A PayoutRecipients object with request parameters defined.
     * @returns PayoutRecipients[]  A list of BitPay PayoutRecipients objects.
     * @throws PayoutRecipientCreationException
     */
    async submit(recipients) {
        recipients.token = this.tokenContainer.getToken(index_1.Facade.Payout);
        recipients.guid = recipients.guid ? recipients.guid : this.guidGenerator.execute();
        try {
            const result = await this.bitPayClient.post('recipients', recipients, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.PayoutRecipientCreation('failed to deserialize BitPay server response (Invoice) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Update a Payout Recipient.
     *
     * @param recipientId The recipient id for the recipient to be updated.
     * @param recipient A PayoutRecipient object with updated parameters defined.
     * @returns PayoutRecipient
     * @throws PayoutRecipientUpdateException
     */
    async update(recipientId, recipient) {
        recipient.token = this.tokenContainer.getToken(index_1.Facade.Payout);
        recipient.guid = recipient.guid ? recipient.guid : this.guidGenerator.execute();
        try {
            const result = await this.bitPayClient.put('recipients/' + recipientId, recipient, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.PayoutRecipientUpdate('failed to deserialize BitPay server response (PayoutRecipient) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Retrieve a BitPay payout recipient by batch id using.  The client must have been previously authorized for the payout facade.
     *
     * @param recipientId The id of the recipient to retrieve.
     * @returns PayoutRecipient
     * @throws PayoutRecipientQueryException
     */
    async get(recipientId) {
        const params = { token: this.tokenContainer.getToken(index_1.Facade.Payout) };
        try {
            const result = await this.bitPayClient.get('recipients/' + recipientId, params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.PayoutRecipientQuery('failed to deserialize BitPay server response (PayoutRecipient) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Retrieve a collection of BitPay Payout Recipients.
     *
     * @param params
     * @returns PayoutRecipient[]
     * @throws PayoutRecipientQueryException
     */
    async getByFilters(params) {
        try {
            params['token'] = this.tokenContainer.getToken(index_1.Facade.Payout);
            const result = await this.bitPayClient.get('recipients', params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.PayoutRecipientQuery('failed to deserialize BitPay server response (PayoutRecipients) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Delete a Payout Recipient.
     *
     * @param recipientId The recipient id for the recipient to be deleted.
     * @returns boolean True if the recipient was successfully deleted, false otherwise.
     * @throws PayoutRecipientCancellationException
     */
    async delete(recipientId) {
        const params = { token: this.tokenContainer.getToken(index_1.Facade.Payout) };
        try {
            const result = await this.bitPayClient.delete('recipients/' + recipientId, params, true);
            return BitPayResponseParser_1.BitPayResponseParser.jsonToBoolean(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.PayoutRecipientCancellation('failed to deserialize BitPay server response (PayoutRecipient) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Notify BitPay Payout Recipient.
     *
     * @param recipientId The id of the recipient to notify.
     * @returns boolean  True if the notification was successfully sent, false otherwise.
     * @throws PayoutRecipientNotificationException
     */
    async requestNotification(recipientId) {
        const params = { token: this.tokenContainer.getToken(index_1.Facade.Payout) };
        try {
            const result = await this.bitPayClient.post('recipients/' + recipientId + '/notifications', params, true);
            return BitPayResponseParser_1.BitPayResponseParser.jsonToBoolean(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.PayoutRecipientNotification('failed to deserialize BitPay server response (PayoutRecipient) : ' + e.message, e.apiCode);
        }
    }
}
exports.PayoutRecipientClient = PayoutRecipientClient;
//# sourceMappingURL=PayoutRecipientClient.js.map