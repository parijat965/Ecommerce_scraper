import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


export const fetchCategories = () => axios.get(`${API_URL}/categories`);

export const fetchProducts = (categoryId, searchQuery = "", page = 1) => {
  let url = `${API_URL}/products?page=${page}`;
  if (categoryId) url += `&category_id=${categoryId}`;
  if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
  return axios.get(url);
};

export const refetchProduct = (productId) =>
  axios.post(`${API_URL}/products/${productId}/refetch`);
