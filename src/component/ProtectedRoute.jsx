import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../helper/jwtDecoder";

export const ProtectedRoute = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  if (!accessToken || isTokenExpired(accessToken)) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};
