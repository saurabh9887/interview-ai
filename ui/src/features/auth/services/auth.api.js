import { Base_url } from "@/Base_Url/Base_url";
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
    const res = await axios.post(url, data, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  const url = `${Base_url}/api/auth/logout`;
  try {
    const res = await axios.get(url, { withCredentials: true });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMe = async () => {
  const url = `${Base_url}/api/auth/get-me`;
  try {
    const res = await axios.get(url, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
