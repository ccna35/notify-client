import { LockClosedIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Inputs/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { emailRegex } from "./Register";
import { API_URL } from "../environment/env";
import { useEffect } from "react";
import { useAppDispatch } from "../store/store";
import authSlice, { setUser, userSelector } from "../app/slices/authSlice";
import { useAppSelector } from "../app/hooks";

interface IFormInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoggedIn } = useAppSelector(userSelector);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const res = await axios.post(API_URL + "/users/login", data, {
        withCredentials: true,
      });
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch(setUser(res.data.user));
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="flex min-h-screen bg-slate-50 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md flex flex-col items-center gap-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="../calendar-svgrepo-com.svg"
              alt="Your Company"
            /> */}
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <span className="mr-2">Or</span>
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                create a new account
              </Link>
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm flex flex-col gap-4"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <Input
                  placeholder="Email"
                  type="text"
                  id="email"
                  register={register("email", {
                    required: "This field is required",
                    validate: {
                      isEmail: (val) => {
                        return (
                          emailRegex.test(val) || "Please enter a valid email"
                        );
                      },
                    },
                  })}
                />
                {errors.email && (
                  <small className="error">{errors.email.message}</small>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Input
                  placeholder="Password"
                  type="password"
                  id="password"
                  register={register("password", {
                    required: "This field is required",
                  })}
                />
                {errors.password && (
                  <small className="error">{errors.password.message}</small>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="rememberMe"
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

            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
