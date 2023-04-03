import { useCookies } from "react-cookie";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../App";

function ProtectedRoutes() {
  // const [cookies, setCookies] = useCookies(["access_token"]);

  const accessToken = useUserStore((state) => state.token);

  let isAuth: boolean;

  if (accessToken || localStorage.getItem("userData")) {
    isAuth = true;
  } else {
    isAuth = false;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
