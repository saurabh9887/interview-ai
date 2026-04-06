import { Base_url } from "@/Base_Url/Base_url";
import api from "@/components/apiInstance";
import axios from "axios";

export const register = async (data) => {
  const url = `${Base_url}/api/auth/register`;
  try {
    const res = await axios.post(url, data, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (data) => {
  const url = `${Base_url}/api/auth/login`;

  try {
    const res = await axios.post(url, data);

    const token = res.data.token;
    localStorage.setItem("token", token);

    return { success: true, data: res.data };
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong";
    return { success: false, message };
  }
};

export const logout = async () => {
  localStorage.removeItem("token");
};

export const forgotPassword = async (data) => {
  return await api.post("/api/auth/forgot-password", data);
};

export const resetPassword = async (data) => {
  return await api.post("/api/auth/reset-password", data);
};
export const getMe = async () => {
  const res = await api.get("/api/auth/get-me");
  return res.data;
};
