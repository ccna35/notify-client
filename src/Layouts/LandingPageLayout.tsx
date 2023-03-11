import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function LandingPageLayout() {
  return (
    <div>
      <nav className="p-4 bg-slate-500 flex gap-4">
        <Link to="/register" className="font-medium">
          Register
        </Link>
        <Link to="/login" className="font-medium">
          Login
        </Link>
        <span className="font-medium">Menu Item</span>
        <span className="font-medium">Menu Item</span>
        <span className="font-medium">Menu Item</span>
      </nav>
      <Outlet />
      <footer>
        This is a landing page footer. This is a landing page footer.
      </footer>
    </div>
  );
}
