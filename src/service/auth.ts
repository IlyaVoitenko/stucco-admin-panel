import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  const csrf = Cookies.get("csrfToken");
  if (csrf) {
    config.headers["X-CSRF-Token"] = csrf;
  }
  return config;
});

// Auth
export const login = async (data: { login: string; password: string }) => {
  const response = await api.post(`auth/login`, {
    username: data.login,
    password: data.password,
  });
  return response;
};
export const IsLogged = async () => {
  await api.get("auth/is-logged-in");
};
export const logout = async () => {
  try {
    await api.patch(`auth/logout`);
  } catch (error) {
    throw new Error(`error status : ${error as Error}`);
  }
};
// Categories
export const createNewCategory = async (data: FormData) => {
  try {
    const response = await api.post("categories", data);
    return response;
  } catch (error) {
    throw new Error(`error status : ${error as Error}`);
  }
};
export const deleteCategory = async (id: number) => {
  try {
    await api.delete(`categories/${id}`);
  } catch (error) {
    throw new Error(`error status : ${error as Error}`);
  }
};
export const updateCategory = async (
  id: number,
  data: FormData,
  signal: AbortSignal,
) => {
  try {
    await api.patch(`categories/${id}`, data, {
      signal,
    });
  } catch (error) {
    throw new Error(`error status : ${error as Error}`);
  }
};
// Products
export const productsByCategory = async (
  categoryId: string,
  signal: AbortSignal,
) => {
  try {
    const response = await api.get(`products/all/${categoryId}`, {
      signal,
    });
    return response;
  } catch (error) {
    throw new Error(`error status : ${error as Error}`);
  }
};
export const createNewProductByCategory = async (data: FormData) => {
  try {
    const response = await api.post("products", data);
    return response;
  } catch (error) {
    throw new Error(`error status : ${error as Error}`);
  }
};
export const updateProductByCategory = async (
  id: number,
  signal: AbortSignal,
  data: FormData,
) => {
  try {
    const response = await api.patch(`products/${id}`, data, { signal });
    return response;
  } catch (error) {
    throw new Error(`error status : ${error as Error}`);
  }
};
