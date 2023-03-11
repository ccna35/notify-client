import { useCookies } from "react-cookie";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function ProtectedRoutes() {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const isAuth = cookies.access_token;

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
