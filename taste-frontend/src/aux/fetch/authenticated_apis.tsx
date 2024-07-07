import axios from "axios";
import { axiosInstance } from "./axios";

// This is a new instance of axios that will be used for authenticated requests.
// just remove this please its not useful

export async function getCart() {
    const response = await axiosInstance.get(`/cart/`, {
        withCredentials: true,
    });
    return response.data;
}
export async function getCartValue() {
    const response = await axiosInstance.get(`/cart/`, {
        withCredentials: true,
    });
    return response.data;
}

export async function addToCart(productId: string, quantity: number = 1) {
    const response = await axiosInstance.post(`/cart/addtocart/`, { product: productId, quantity: quantity }, {
        withCredentials: true,
    });
    return response.data;
}

export async function removeFromCart(cartItemId: number) {
    const response = await axiosInstance.post(`/cart/removefromcart/`, { cartItem: cartItemId }, {
        withCredentials: true,
    });
    return response.data;
}

export async function decreaseQuantity(cartItemId: number, quantity: number = 1) {
    const response = await axiosInstance.post(`/cart/decreasequantity/`, { cartItem: cartItemId, quantity: quantity }, {
        withCredentials: true,
    });
    return response.data;
}

export async function increaseQuantity(productId: string) {
    const response = await axiosInstance.post(`/cart/increasequantity/`, { cartItem: productId }, {
        withCredentials: true,
    });
    return response.data;
}
