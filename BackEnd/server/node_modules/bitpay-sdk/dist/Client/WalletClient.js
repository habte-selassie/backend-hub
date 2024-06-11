"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletClient = void 0;
const index_1 = require("../index");
class WalletClient {
    constructor(bitPayClient) {
        this.bitPayClient = bitPayClient;
    }
    /**
     * Retrieve all supported wallets.
     *
     * @returns Wallet[]
     * @throws WalletQueryException
     */
    async getSupportedWallets() {
        try {
            const result = await this.bitPayClient.get('supportedwallets', null, false);
            return JSON.parse(result);
        }
        catch (e) {
            throw new index_1.BitPayExceptions.WalletQuery('failed to deserialize BitPay server response (Wallet) : ' + e.message, e.apiCode);
        }
    }
}
exports.WalletClient = WalletClient;
//# sourceMappingURL=WalletClient.js.map