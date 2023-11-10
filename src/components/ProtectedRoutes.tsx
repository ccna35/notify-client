import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../app/slices/authSlice";

function ProtectedRoutes() {
  const { isLoggedIn } = useAppSelector(userSelector);

  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProtectedRoutes;
