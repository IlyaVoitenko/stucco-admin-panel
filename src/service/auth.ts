import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});
export const login = async (data: { login: string; password: string }) => {
  const response = await api.post(`auth/login`, {
    username: data.login,
    password: data.password,
  });
  return response;
};
export const createNewCategory = async (data) => {
  try {
    const response = await api.post("categories", data);
    return response;
  } catch (error) {
    throw new Error(`error status : ${error as Error}`);
  }
};
export const IsLogged = async () => {
  try {
    const response = await api.get("auth/is-logged-in");
    return response;
  } catch (error) {
    return error;
  }
};
