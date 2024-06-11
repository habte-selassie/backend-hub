import { BitPayClient } from './BitPayClient';
import { WalletInterface } from '../Model/Wallet/Wallet';
export declare class WalletClient {
    private bitPayClient;
    constructor(bitPayClient: BitPayClient);
    /**
     * Retrieve all supported wallets.
     *
     * @returns Wallet[]
     * @throws WalletQueryException
     */
    getSupportedWallets(): Promise<WalletInterface[]>;
}
