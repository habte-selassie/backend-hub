import PayoutRecipientException from './PayoutRecipientException';
export declare class PayoutRecipientCreationException implements PayoutRecipientException {
    readonly message: string;
    readonly name: string;
    readonly code: number;
    readonly stack: string;
    readonly apiCode: string;
    /**
     * Construct the PayoutRecipientCreationException.
     *
     * @param message string [optional] The Exception message to throw.
     * @param apiCode string [optional] The API Exception code to throw.
     */
    constructor(message: string, apiCode?: string);
}
export default PayoutRecipientCreationException;
