import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent, useState, ChangeEvent, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { NoteType } from "./Home";

export type UserType = {
  data?: {
    accessToken: string;
    userData: {
      id: string;
      email: string | undefined;
      firstName: string;
      lastName: string;
    };
  };
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  secondPassword?: string;
  accessToken?: string;
};

const API_URL: string = import.meta.env.DEV
  ? import.meta.env.VITE_REACT_DEV_API_URL
  : import.meta.env.VITE_REACT_PROD_API_URL;

export default function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { user, setUser } = useContext(UserContext);

  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      navigate("/home");
    }
  }, []);

  const queryClient = useQueryClient();

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const checkPassword = (e: any) => {
    console.log(e.target.value);
    let value: string = e.target.value;
    setPassword(value);
    if (!value.match(passwordRegex)) {
      setPasswordError(
        "Password must be at least 8 characters long and includes letters, numbers and special characters."
      );
      console.log(passwordError);
      console.log(password);
      setPassword(value);
    } else {
      setPasswordError("");
    }
  };

  const mutation = useMutation({
    mutationFn: (newUser: UserType) => {
      return axios.post<UserType>(`${API_URL}/users/new`, newUser);
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
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

      console.log(cookies);
      console.log(JSON.parse(localStorage.getItem("userData")!));
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setSecondPassword("");
      navigate("/home");
    },
    onError: (error: any) => {
      setError(error.response.data.message);
      console.log(error);
    },
  });

  return (
    <div className="mt-10 sm:mt-0 sm:p-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Use a permanent address where you can receive mail.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate({
                firstName,
                lastName,
                email,
                password,
                secondPassword,
              });
            }}
          >
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                {error && (
                  <div className="mb-4 bg-red-200 p-2 text-red-800 rounded border border-red-300">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      required
                      autoComplete="given-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      required
                      autoComplete="family-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      required
                      autoComplete="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      // onChange={(e) => setPassword(e.target.value)}
                      onChange={checkPassword}
                      value={password}
                    />
                    {passwordError && (
                      <div className="mb-4 bg-red-200 p-2 text-red-800 rounded border border-red-300">
                        {passwordError}
                      </div>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => setSecondPassword(e.target.value)}
                      value={secondPassword}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? "Loading..." : "Sign up"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
