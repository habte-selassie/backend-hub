import SubscriptionException from './SubscriptionException';
export declare class SubscriptionUpdateException implements SubscriptionException {
    readonly message: string;
    readonly name: string;
    readonly code: number;
    readonly stack: string;
    readonly apiCode: string;
    /**
     * Construct the SubscriptionUpdateException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message: string, apiCode?: string);
}
export default SubscriptionUpdateException;
