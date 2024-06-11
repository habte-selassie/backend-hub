import { Facade } from './Facade';
export declare class TokenContainer {
    private readonly data;
    constructor(tokens?: object);
    /**
     *
     * @param key
     * @returns string
     */
    getToken(key: string): string;
    /**
     *
     * @param token
     */
    addPos(token: string): void;
    /**
     *
     * @param token
     */
    addMerchant(token: string): void;
    /**
     *
     * @param token
     */
    addPayout(token: string): void;
    /**
     *
     * @param facade
     * @returns
     */
    isTokenExist(facade: Facade): boolean;
    /**
     *
     * @param facade
     * @param token
     */
    private add;
}
