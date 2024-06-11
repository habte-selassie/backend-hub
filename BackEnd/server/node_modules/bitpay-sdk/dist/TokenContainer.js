"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenContainer = void 0;
const BitPayException_1 = require("./Exceptions/BitPayException");
const Facade_1 = require("./Facade");
class TokenContainer {
    constructor(tokens) {
        this.data = new Map();
        if (tokens !== undefined) {
            Object.keys(tokens).forEach((key) => {
                this.add(key, String(tokens[key]));
            });
        }
    }
    /**
     *
     * @param key
     * @returns string
     */
    getToken(key) {
        if (!this.data.has(key)) {
            throw new BitPayException_1.default(null, 'There is no token for the specified key : ' + key);
        }
        return this.data.get(key);
    }
    /**
     *
     * @param token
     */
    addPos(token) {
        this.data.set(Facade_1.Facade.Pos, token);
    }
    /**
     *
     * @param token
     */
    addMerchant(token) {
        this.data.set(Facade_1.Facade.Merchant, token);
    }
    /**
     *
     * @param token
     */
    addPayout(token) {
        this.data.set(Facade_1.Facade.Payout, token);
    }
    /**
     *
     * @param facade
     * @returns
     */
    isTokenExist(facade) {
        return this.data.has(facade);
    }
    /**
     *
     * @param facade
     * @param token
     */
    add(facade, token) {
        this.data.set(facade, token);
    }
}
exports.TokenContainer = TokenContainer;
//# sourceMappingURL=TokenContainer.js.map