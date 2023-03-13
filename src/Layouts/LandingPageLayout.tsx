import { Outlet } from "react-router-dom";
import Navbar from "../components/LandingPageComponents/Navbar";
import Footer from "../components/LandingPageComponents/Footer";

export default function LandingPageLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
