import { BitPayClient } from './BitPayClient';
import { TokenContainer } from '../TokenContainer';
import { LedgerEntryInterface, LedgerInterface } from '../Model';
export declare class LedgerClient {
    private bitPayClient;
    private tokenContainer;
    constructor(bitPayClient: BitPayClient, tokenContainer: TokenContainer);
    /**
     * Retrieve a list of ledgers using the merchant facade.
     *
     * @return A list of Ledger objects populated with the currency and current balance of each one.
     * @throws LedgerQueryException LedgerQueryException class
     */
    getLedgers(): Promise<LedgerInterface[]>;
    /**
     * Retrieve a list of ledgers by params
     *
     * @param currency
     * @param params
     * @returns ledgers
     * @throws LedgerQueryException
     */
    getEntries(currency: string, params: object): Promise<LedgerEntryInterface[]>;
}
