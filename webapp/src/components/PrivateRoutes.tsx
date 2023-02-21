import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthInfo } from "../redux/slices/auth/authSlice";
import { AuthStateType } from "../redux/slices/auth/types";
import { AppBarUnauth } from "./AppBarUnauth";
import { Footer } from "./Footer";

const PrivateRoutes = () => {
  const authInfo: AuthStateType = useSelector(getAuthInfo);
  return authInfo.authenticated ? (
    <>
      <AppBarUnauth />
      <Outlet />
      <Footer sx={{ mt: 8, mb: 4 }} />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
