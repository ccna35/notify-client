import { useContext, useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useCookies from "react-cookie/cjs/useCookies";
import { Link, useNavigate } from "react-router-dom";
import { UserType } from "./Register";
import { UserContext, useUserStore } from "../App";

const API_URL: string = import.meta.env.DEV
  ? import.meta.env.VITE_REACT_DEV_API_URL
  : import.meta.env.VITE_REACT_PROD_API_URL;

export default function Login() {
  const updateToken = useUserStore((state) => state.updateToken);
  const updateTheme = useUserStore((state) => state.updateTheme);
  const darkMode = useUserStore((state) => state.darkMode);

  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("userData")) {
  //     navigate("/home");
  //   }
  // }, []);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser: UserType) => {
      return axios.post<UserType>(`${API_URL}/users/login`, newUser, {
        withCredentials: true,
      });
    },
    onSuccess: (data) => {
      console.log("onSuccess: ", data);

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
      updateToken(data.data.data?.accessToken as string);
      setCookies("access_token", data.data.data?.accessToken);
      localStorage.setItem(
        "userData",
        JSON.stringify(data.data.data?.userData)
      );
      setUser({
        name:
          data.data.data?.userData.firstName +
          " " +
          data.data.data?.userData.lastName,
        status: true,
        email: data.data.data?.userData.email as string,
      });

      console.log(user.status);

      setEmail("");
      setPassword("");
      navigate("/home");
    },
    onError: (error: any) => {
      setError(error.response.data.message);
      console.log("onError: ", error.response.data.message);
    },
  });

  return (
    <>
      <div
        className={`flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
          darkMode && "dark"
        }`}
      >
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
              onClick={() => updateTheme()}
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                create a new account
              </Link>
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate({
                email,
                password,
              });
            }}
            // onSubmit={(e) => handleSubmit(e)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>
            {error && (
              <div className="bg-red-200 p-2 text-red-800 rounded border border-red-300">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={mutation.isLoading}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                {mutation.isLoading ? "Loading..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
