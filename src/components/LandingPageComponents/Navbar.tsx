import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="py-2 bg-slate-300">
      <div className="container flex justify-between">
        <Link to="/">
          <img
            className="block h-8 w-auto lg:hidden"
            src="../calendar-svgrepo-com.svg"
            alt="Notify"
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
