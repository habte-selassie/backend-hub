export interface RefundInfoInterface {
    supportRequest: string | null;
    currency: string | null;
    refundRequestEid: string | null;
    amounts: [];
}
export declare class RefundInfo implements RefundInfoInterface {
    supportRequest: string | null;
    currency: string | null;
    refundRequestEid: string | null;
    amounts: [];
    constructor();
}
