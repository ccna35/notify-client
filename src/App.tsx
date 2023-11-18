import Home from "./pages/Home";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import Login from "./pages/Login";
import New from "./pages/NewNote";
import Privacy from "./pages/Privacy";
import Tos from "./pages/Tos";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LandingPage from "./pages/LandingPage";
import Premium from "./pages/Premium";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import PublicRoutes from "./components/PublicRoutes";
import EditNote from "./pages/EditNote";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFoundPage />}>
      <Route element={<RootLayout />}>
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit/:id" element={<EditNote />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/premium" element={<Premium />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tos" element={<Tos />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
