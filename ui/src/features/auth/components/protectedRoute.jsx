import React from "react";
import { useAuth } from "../hooks/useAuth";
import Loader from "@/components/Loader";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { loader, user } = useAuth();
  if (loader) return <Loader />;

  if (!user) return <Navigate to={"/login"} />;
  return children;
};

export default ProtectedRoute;
