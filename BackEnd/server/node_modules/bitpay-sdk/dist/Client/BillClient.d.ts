import { BitPayClient } from './BitPayClient';
import { TokenContainer } from '../TokenContainer';
import { BillInterface } from '../Model';
export declare class BillClient {
    private bitPayClient;
    private tokenContainer;
    constructor(bitPayClient: BitPayClient, tokenContainer: TokenContainer);
    /**
     * Create a BitPay Bill.
     *
     * @param bill A Bill object with request parameters defined.
     * @param facade The facade used to create it.
     * @param signRequest Signed request.
     * @returns Bill
     * @throws BillCreationException
     */
    create(bill: BillInterface, facade: string, signRequest: boolean): Promise<BillInterface>;
    /**
     * Retrieve a BitPay bill by bill id using the specified facade.
     *
     * @param billId The id of the bill to retrieve
     * @param facade The facade used to retrieve it.
     * @param signRequest Signed request
     * @returns Bill
     * @throws BillQueryException
     */
    get(billId: string, facade: string, signRequest: boolean): Promise<BillInterface>;
    /**
     * Retrieve a collection of BitPay bills.
     *
     * @param status
     * @returns Bill[]
     * @throws BillQueryException
     */
    getBills(status: string | null): Promise<BillInterface>;
    /**
     * Update a BitPay Bill.
     *
     * @param bill
     * @param billId
     * @returns Bill
     * @throws BillUpdateException
     */
    update(bill: BillInterface, billId: string): Promise<BillInterface>;
    /**
     * Delivery a BitPay Bill.
     *
     * @param billId
     * @param billToken
     * @param signRequest
     * @returns string
     * @throws BillDeliveryException
     */
    deliver(billId: string, billToken: string, signRequest: boolean): Promise<boolean>;
}
