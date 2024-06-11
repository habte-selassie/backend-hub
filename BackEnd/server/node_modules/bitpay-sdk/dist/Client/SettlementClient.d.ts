import { BitPayClient } from './BitPayClient';
import { TokenContainer } from '../TokenContainer';
import { SettlementInterface } from '../Model/Settlement/Settlement';
export declare class SettlementClient {
    private bitPayClient;
    private tokenContainer;
    constructor(bitPayClient: BitPayClient, tokenContainer: TokenContainer);
    /**
     * Retrieves a summary of the specified settlement.
     *
     * @param settlementId Settlement Id
     * @returns Settlement
     * @throws SettlementQueryException
     */
    get(settlementId: string): Promise<SettlementInterface>;
    /**
     * Retrieves settlement reports for the calling merchant filtered by query.
     *
     * @param params
     * @returns Settlement[]
     * @throws SettlementQueryException
     */
    getSettlements(params: object): Promise<SettlementInterface[]>;
    /**
     * Gets a detailed reconciliation report of the activity within the settlement period.
     *
     * @param settlementId
     * @param token
     * @returns Settlement
     * @throws SettlementQueryException
     */
    getReconciliationReport(settlementId: string, token: string): Promise<SettlementInterface>;
}
