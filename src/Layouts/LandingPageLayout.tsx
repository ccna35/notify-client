import { Outlet } from "react-router-dom";

export default function LandingPageLayout() {
  return (
    <div>
      <nav className="p-4 bg-slate-500 flex gap-4">
        <span>Menu Item</span>
        <span>Menu Item</span>
        <span>Menu Item</span>
        <span>Menu Item</span>
      </nav>
      <Outlet />
      <footer>
        This is a landing page footer. This is a landing page footer.
      </footer>
    </div>
  );
}
