"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillClient = void 0;
const Facade_1 = require("../Facade");
const index_1 = require("../index");
class BillClient {
    constructor(bitPayClient, tokenContainer) {
        this.bitPayClient = bitPayClient;
        this.tokenContainer = tokenContainer;
    }
    /**
     * Create a BitPay Bill.
     *
     * @param bill A Bill object with request parameters defined.
     * @param facade The facade used to create it.
     * @param signRequest Signed request.
     * @returns Bill
     * @throws BillCreationException
     */
    async create(bill, facade, signRequest) {
        bill.token = this.tokenContainer.getToken(facade);
        try {
            const result = await this.bitPayClient.post('bills', bill, signRequest);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.BillCreation('failed to deserialize BitPay server response (Bill) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Retrieve a BitPay bill by bill id using the specified facade.
     *
     * @param billId The id of the bill to retrieve
     * @param facade The facade used to retrieve it.
     * @param signRequest Signed request
     * @returns Bill
     * @throws BillQueryException
     */
    async get(billId, facade, signRequest) {
        const params = { token: this.tokenContainer.getToken(facade) };
        try {
            const result = await this.bitPayClient.get('bills/' + billId, params, signRequest);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.BillQuery('failed to deserialize BitPay server response (Bill) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Retrieve a collection of BitPay bills.
     *
     * @param status
     * @returns Bill[]
     * @throws BillQueryException
     */
    async getBills(status) {
        const params = { token: this.tokenContainer.getToken(Facade_1.Facade.Merchant) };
        if (status) {
            params['status'] = status;
        }
        try {
            const result = await this.bitPayClient.get('bills', params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.BillQuery('failed to deserialize BitPay server response (Bill) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Update a BitPay Bill.
     *
     * @param bill
     * @param billId
     * @returns Bill
     * @throws BillUpdateException
     */
    async update(bill, billId) {
        try {
            const result = await this.bitPayClient.put('bills/' + billId, bill);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.BillUpdate('failed to deserialize BitPay server response (Bill) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Delivery a BitPay Bill.
     *
     * @param billId
     * @param billToken
     * @param signRequest
     * @returns string
     * @throws BillDeliveryException
     */
    async deliver(billId, billToken, signRequest) {
        const params = { token: billToken };
        try {
            const result = await this.bitPayClient.post('bills/' + billId + '/deliveries', params, signRequest);
            return JSON.parse(result) == 'Success';
        }
        catch (e) {
            throw new index_1.BitPayExceptions.BillDelivery('failed to deserialize BitPay server response (Bill) : ' + e.message, e.apiCode);
        }
    }
}
exports.BillClient = BillClient;
//# sourceMappingURL=BillClient.js.map