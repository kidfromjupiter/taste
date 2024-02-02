import { axiosInstance } from "./axios";

export async function getAllProducts() {
    const response = await axiosInstance.get("/products/all");
    return response.data;
}

export async function getProductById(id: string) {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;

}

export async function searchProducts(searchTerm: string) {
    const response = await axiosInstance.get('/products', { params: { search: searchTerm } });
    return response.data;
}
