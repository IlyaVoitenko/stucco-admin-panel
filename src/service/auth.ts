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
export const login = async (data: { login: string; password: string }) => {
  const response = await api.post(`auth/login`, {
    username: data.login,
    password: data.password,
  });
  return response;
};
export const createNewCategory = async (data: FormData) => {
  try {
    const response = await api.post("categories", data);
    return response;
  } catch (error) {
    throw new Error(`error status : ${error as Error}`);
  }
};
export const IsLogged = async () => {
  await api.get("auth/is-logged-in");
};
export const logout = async () => {
  try {
    console.log("started");
    const response = await api.patch(`auth/logout`);
    console.log("done");

    console.log(response);
    return response;
  } catch (error) {
    throw new Error(`error status : ${error as Error}`);
  }
};
