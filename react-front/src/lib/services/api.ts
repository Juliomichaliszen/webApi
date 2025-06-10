import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

api.defaults.headers.common["x-api-key"] = process.env.NEXT_PUBLIC_API_KEY;

api.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
