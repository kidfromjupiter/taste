export type Response = {
    results: any[];
    count: number;
    next: string | URL;
    previous: string | URL;
}
export interface Product {
    collection: null | string;
    created_at: string;
    description: string;
    domestic_price: string;
    domestic_price_currency: string;
    id: string;
    image: string;
    international_price: string;
    international_price_currency: string;
    name: string;
    stock: number;
    updated_at: string;
}
export interface ListProduct extends Product {
    removeItem?: (itemId: string) => void;
    simplified?: boolean;
}