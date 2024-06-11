export interface ItemInterface {
    id: string;
    description: string;
    price: number;
    quantity: number;
}
export declare class Item implements ItemInterface {
    description: string;
    id: string;
    quantity: number;
    price: number;
    constructor();
}
