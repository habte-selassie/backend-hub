export declare class BitPayException implements Error {
    readonly message: string;
    readonly name: string;
    readonly code: number;
    readonly stack: string;
    readonly apiCode: string;
    /**
     * Construct the BitPayException.
     *
     * @param name    string [optional] The Exception type to throw.
     * @param message string [optional] The Exception message to throw.
     * @param code    number [optional] The Exception code to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(name?: string, message?: string, code?: number, apiCode?: string);
}
export default BitPayException;
