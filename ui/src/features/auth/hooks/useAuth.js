import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import {
  forgotPassword,
  getMe,
  login,
  logout,
  register,
  resetPassword,
} from "../services/auth.api";
import { LoaderContext } from "@/components/LoaderContext";

export const useAuth = () => {
  const { user, setUser, loader } = useContext(AuthContext);
  const { setSpinner } = useContext(LoaderContext);

  useEffect(() => {
    GetAndSetData();
  }, []);

  const handleLogin = async ({ email, password }) => {
    setSpinner(true);

    try {
      const res = await login({ email, password });

      if (res.success) {
        setUser(res.data.user);
        return { success: true };
      }

      return {
        success: false,
        message: res.message,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    } finally {
      setSpinner(false);
    }
  };
  const handleRegister = async ({ username, email, password }) => {
    setSpinner(true);
    try {
      const data = await register({ username, email, password });
      if (!data) return false;
      setUser(data.user);
      setSpinner(false);
      return true;
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  const handleLogout = async () => {
    setSpinner(true);
    try {
      await logout();
      setUser(null);
      setSpinner(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  const handleForgetPassword = async (email) => {
    setSpinner(true);
    try {
      await forgotPassword({ email });
      setSpinner(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  const handleResetPassword = async (token, password) => {
    setSpinner(true);
    try {
      await resetPassword({ token, password });
      setSpinner(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  const GetAndSetData = async () => {
    try {
      const data = await getMe();
      setUser(data?.user || null);
    } catch (err) {
      setUser(null);
    } finally {
      setSpinner(false);
    }
  };

  return {
    user,
    handleLogin,
    handleRegister,
    handleLogout,
    loader,
    handleForgetPassword,
    handleResetPassword,
  };
};
