import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { getMe, login, logout, register } from "../services/auth.api";
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
      const data = await login({ email, password });
      if (!data?.user) return false;
      setUser(data?.user);
      setSpinner(false);
      return true;
    } catch (error) {
      console.log(error);
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

  return { user, handleLogin, handleRegister, handleLogout, loader };
};
