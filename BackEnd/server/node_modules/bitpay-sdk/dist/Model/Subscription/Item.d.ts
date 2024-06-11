export interface ItemInterface {
    description: string | null;
    price: number | null;
    quantity: number | null;
}
export declare class Item implements ItemInterface {
    description: string | null;
    price: number | null;
    quantity: number | null;
    constructor(price: number, quantity: number, description: string);
}
