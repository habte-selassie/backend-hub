import { ec } from 'elliptic';
import KeyPair = ec.KeyPair;
export declare class BitPayClient {
    private readonly ecKey;
    private readonly identity;
    private readonly baseUrl;
    private readonly defaultHeaders;
    private readonly keyUtils;
    private readonly responseParser;
    constructor(baseUrl: string, ecKey: KeyPair, identity: string);
    /**
     *
     * @param uri
     * @param parameters
     * @param signatureRequired
     * @returns
     */
    get(uri: string, parameters: any, signatureRequired?: boolean): Promise<any>;
    /**
     *
     * @param uri
     * @param formData
     * @param signatureRequired
     * @returns
     */
    post(uri: string, formData?: any, signatureRequired?: boolean): Promise<any>;
    /**
     *
     * @param uri
     * @param formData
     * @param signatureRequired
     * @returns
     */
    put(uri: string, formData?: any, signatureRequired?: boolean): Promise<any>;
    /**
     *
     * @param uri
     * @param parameters
     * @param signatureRequired
     * @returns
     */
    delete(uri: string, parameters?: any, signatureRequired?: boolean): Promise<any>;
    /**
     *
     * @param fullUrl
     * @param headers
     * @param jsonData
     * @returns
     */
    private getSignatureHeaders;
}
