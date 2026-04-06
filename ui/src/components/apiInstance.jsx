import axios from "axios";
import { Base_url } from "@/Base_Url/Base_url";

const api = axios.create({
  baseURL: Base_url,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
