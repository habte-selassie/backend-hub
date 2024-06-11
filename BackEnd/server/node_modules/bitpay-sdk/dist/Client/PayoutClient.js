"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutClient = void 0;
const Facade_1 = require("../Facade");
const index_1 = require("../index");
const BitPayResponseParser_1 = require("../util/BitPayResponseParser");
const PayoutGroup_1 = require("../Model/Payout/PayoutGroup");
class PayoutClient {
    constructor(bitPayClient, tokenContainer, guidGenerator) {
        /**
         * Notify BitPay Payout.
         *
         * @param payoutId The id of the Payout to notify.
         * @returns boolean
         * @throws PayoutNotificationException
         */
        this.requestNotification = async (payoutId) => {
            const params = { token: this.tokenContainer.getToken(Facade_1.Facade.Payout) };
            try {
                const result = await this.bitPayClient.post('payouts/' + payoutId + '/notifications', params, true);
                return BitPayResponseParser_1.BitPayResponseParser.jsonToBoolean(result);
            }
            catch (e) {
                throw new index_1.BitPayExceptions.PayoutNotification('failed to deserialize BitPay server response (Payout) : ' + e.message, e.apiCode);
            }
        };
        /**
         *  Cancel a BitPay Payout.
         *
         * @param payoutId
         * @returns boolean
         * @throws PayoutDeleteException
         */
        this.cancel = async (payoutId) => {
            const params = { token: this.tokenContainer.getToken(Facade_1.Facade.Payout) };
            try {
                const result = await this.bitPayClient.delete('payouts/' + payoutId, params, true);
                return BitPayResponseParser_1.BitPayResponseParser.jsonToBoolean(result);
            }
            catch (e) {
                throw new index_1.BitPayExceptions.PayoutDelete('failed to deserialize BitPay server response (Payout) : ' + e.message, e.apiCode);
            }
        };
        this.submitPayouts = async (payouts) => {
            const params = { token: this.tokenContainer.getToken(Facade_1.Facade.Payout), instructions: payouts };
            try {
                const result = await this.bitPayClient.post('payouts/group', params, true);
                return PayoutClient.getPayoutGroupResponse(result, 'created');
            }
            catch (e) {
                throw new index_1.BitPayExceptions.PayoutCreation('failed to deserialize BitPay server response (Payout) : ' + e.message, e.apiCode);
            }
        };
        this.cancelPayouts = async (payoutGroupId) => {
            const params = { token: this.tokenContainer.getToken(Facade_1.Facade.Payout) };
            try {
                const result = await this.bitPayClient.delete('payouts/group/' + payoutGroupId, params, true);
                return PayoutClient.getPayoutGroupResponse(result, 'cancelled');
            }
            catch (e) {
                throw new index_1.BitPayExceptions.PayoutCreation('failed to deserialize BitPay server response (Payout) : ' + e.message, e.apiCode);
            }
        };
        this.bitPayClient = bitPayClient;
        this.tokenContainer = tokenContainer;
        this.guidGenerator = guidGenerator;
    }
    /**
     * Submit a BitPay Payout.
     *
     * @param payout Payout object with request parameters defined.
     * @returns Pyaout
     * @throws PayoutCreationException
     */
    async submit(payout) {
        payout.token = this.tokenContainer.getToken(Facade_1.Facade.Payout);
        try {
            const result = await this.bitPayClient.post('payouts', payout, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.PayoutCreation('failed to deserialize BitPay server response (Payout) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Retrieve a BitPay payout by payout id using. The client must have been previously authorized
     * for the payout facade.
     *
     * @param payoutId The id of the payout to retrieve.
     * @returns Pyaout
     * @throws PayoutQueryException
     */
    async get(payoutId) {
        const params = { token: this.tokenContainer.getToken(Facade_1.Facade.Payout) };
        try {
            const result = await this.bitPayClient.get('payouts/' + payoutId, params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.PayoutQuery('failed to deserialize BitPay server response (Payout) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Retrieve a collection of BitPay payouts.
     *
     * @param params
     * @returns Payout[]
     * @throws PayoutQueryException
     */
    async getPayouts(params) {
        params['token'] = this.tokenContainer.getToken(Facade_1.Facade.Payout);
        try {
            const result = await this.bitPayClient.get('payouts', params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.PayoutQuery('failed to deserialize BitPay server response (Payout) : ' + e.message, e.apiCode);
        }
    }
    static getPayoutGroupResponse(json, responseType) {
        const response = JSON.parse(json);
        if (!(responseType in response)) {
            throw new index_1.BitPayExceptions.PayoutCreation('Cannot parse Payout Group. Response : ' + response);
        }
        return new PayoutGroup_1.PayoutGroup(response[responseType], response['failed']);
    }
}
exports.PayoutClient = PayoutClient;
//# sourceMappingURL=PayoutClient.js.map