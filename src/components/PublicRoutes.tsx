import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../app/slices/authSlice";

function PublicRoutes() {
  const { isLoggedIn } = useAppSelector(userSelector);

  return isLoggedIn ? <Navigate to="/home" /> : <Outlet />;
}

export default PublicRoutes;
