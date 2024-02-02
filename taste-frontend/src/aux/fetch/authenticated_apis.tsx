import axios from "axios";
import { axiosInstance } from "./axios";

// This is a new instance of axios that will be used for authenticated requests.

export async function getCart() {
    const response = await axiosInstance.get(`/cart/`, {
        withCredentials: true,
    });
    return response.data;
}

export async function addToCart(productId: string) {
    const response = await axiosInstance.post(`/cart/addtocart/`, { product: productId }, {
        withCredentials: true,
    });
    return response.data;
}