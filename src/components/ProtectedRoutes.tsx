import { Navigate, Outlet, useNavigate } from "react-router-dom";

function ProtectedRoutes() {
  const accessToken = true;

  let isAuth: boolean;

  if (accessToken || localStorage.getItem("userData")) {
    isAuth = true;
  } else {
    isAuth = false;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
