import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { getMe, login, logout, register } from "../services/auth.api";

export const useAuth = () => {
  const { user, setUser, loader, setLoader } = useContext(AuthContext);

  useEffect(() => {
    GetAndSetData();
  }, []);

  const handleLogin = async ({ email, password }) => {
    debugger;
    setLoader(true);

    try {
      const data = await login({ email, password });
      if (!data?.user) return false;
      setUser(data?.user);
      setLoader(false);
      return true;
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoader(true);
    try {
      const data = await register({ username, email, password });
      if (!data) return false;
      setUser(data.user);
      setLoader(false);
      return true;
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleLogout = async ({ username, email, password }) => {
    setLoader(true);
    try {
      const data = await logout();
      setUser(null);
      setLoader(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const GetAndSetData = async () => {
    try {
      const data = await getMe();
      setUser(data?.user || null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoader(false);
    }
  };

  return { user, handleLogin, handleRegister, handleLogout, loader };
};
