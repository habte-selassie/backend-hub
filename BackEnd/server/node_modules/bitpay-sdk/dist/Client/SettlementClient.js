"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementClient = void 0;
const index_1 = require("../index");
class SettlementClient {
    constructor(bitPayClient, tokenContainer) {
        this.bitPayClient = bitPayClient;
        this.tokenContainer = tokenContainer;
    }
    /**
     * Retrieves a summary of the specified settlement.
     *
     * @param settlementId Settlement Id
     * @returns Settlement
     * @throws SettlementQueryException
     */
    async get(settlementId) {
        const params = { token: this.tokenContainer.getToken(index_1.Facade.Merchant) };
        try {
            const result = await this.bitPayClient.get('settlements/' + settlementId, params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.SettlementQuery('failed to deserialize BitPay server response (Settlement) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Retrieves settlement reports for the calling merchant filtered by query.
     *
     * @param params
     * @returns Settlement[]
     * @throws SettlementQueryException
     */
    async getSettlements(params) {
        params['token'] = this.tokenContainer.getToken(index_1.Facade.Merchant);
        try {
            const result = await this.bitPayClient.get('settlements', params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.SettlementQuery('failed to deserialize BitPay server response (Settlement) : ' + e.message, e.apiCode);
        }
    }
    /**
     * Gets a detailed reconciliation report of the activity within the settlement period.
     *
     * @param settlementId
     * @param token
     * @returns Settlement
     * @throws SettlementQueryException
     */
    async getReconciliationReport(settlementId, token) {
        const params = { token: token };
        try {
            const result = await this.bitPayClient.get('settlements/' + settlementId + '/reconciliationReport', params, true);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.SettlementQuery('failed to deserialize BitPay server response (Settlement) : ' + e.message, e.apiCode);
        }
    }
}
exports.SettlementClient = SettlementClient;
//# sourceMappingURL=SettlementClient.js.map