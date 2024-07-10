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


export interface CartItem {
    id: number,
    product: Product,
    cart: number,
    quantity: number,
}

export interface ListProduct extends Product {
    removeItem?: (productId: string) => void;
    simplified?: boolean;
    addToCart?: () => void;
    decreaseQuantity?: () => void;
}

export interface CartItemListComponentProps extends CartItem {
    removeItem?: (cartItemId:number) => void;
    simplified?: boolean;
    addToCart?: (arg0:number) => void;
    decreaseQuantity?: () => void;
}
