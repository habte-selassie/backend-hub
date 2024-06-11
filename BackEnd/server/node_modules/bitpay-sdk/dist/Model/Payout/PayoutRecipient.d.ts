export interface PayoutRecipientInterface {
    email: string;
    label: string;
    notificationURL: string;
    status: string | null;
    id: string | null;
    shopperId: string | null;
    token: string | null;
    guid: string | null;
}
export declare class PayoutRecipient implements PayoutRecipientInterface {
    email: string;
    id: string | null;
    label: string;
    notificationURL: string;
    shopperId: string | null;
    status: string | null;
    token: string | null;
    guid: string | null;
    constructor(email: string | null, label: string | null, notificationURL: string | null);
}
