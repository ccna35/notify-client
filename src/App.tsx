import Register from "./pages/Register";
import Home from "./pages/Home";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import Login from "./pages/Login";
import New from "./pages/New";
import LandingPageLayout from "./Layouts/LandingPageLayout";
import Privacy from "./pages/Privacy";
import Tos from "./pages/Tos";
import NotFoundPage from "./pages/NotFoundPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import LandingPage from "./pages/LandingPage";
import Premium from "./pages/Premium";
import { create } from "zustand";

// Zustand logic
interface UserState {
  name: string;
  darkMode: boolean;
  token: string;
  updateToken: (by: string) => void;
  updateTheme: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  name: "",
  darkMode: false,
  token: "",
  updateToken: (by) => set((state) => ({ token: by })),
  updateTheme: () => set((state) => ({ darkMode: !state.darkMode })),
}));

// End Zustand logic

type User = {
  name: string;
  email: string;
  status: boolean;
};

interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const defaultState = {
  user: {
    name: "",
    email: "",
    status: false,
  },
  setUser: (user: User) => {},
} as UserContextInterface;

export const UserContext = createContext(defaultState);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFoundPage />}>
      <Route element={<RootLayout />}>
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/premium" element={<Premium />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/" element={<LandingPageLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tos" element={<Tos />} />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    status: false,
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default App;
