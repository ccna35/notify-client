import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../components/Inputs/Input";
import { IRegisterFormInput } from "../types/types";
import { useRegisterMutation } from "../app/api/userApiSlice";
import { useAppDispatch } from "../store/store";
import { setUser, userSelector } from "../app/slices/authSlice";
import { useAppSelector } from "../app/hooks";
import { BiLoaderAlt } from "react-icons/bi";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IRegisterFormInput>({ mode: "onChange" });

  const [addNewUser, { isLoading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<IRegisterFormInput> = async (data) => {
    try {
      const res = await addNewUser(data).unwrap();
      console.log(res);
      setErrorMsg("");
      localStorage.setItem("user", JSON.stringify(res.user));
      dispatch(setUser(res.user));
      navigate("/home");
    } catch (error) {
      if (error.originalStatus === 400) {
        setErrorMsg(error.data);
      }
      console.log(error);
    }
  };

  // const { isLoggedIn } = useAppSelector(userSelector);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/home");
  //   }
  // }, []);

  return (
    <section className="py-16 bg-slate-50 min-h-screen grid dark:bg-slate-950">
      <div className="container flex flex-col gap-8 justify-center items-center dark:bg-slate-900 dark:border-slate-800 p-8 rounded-md w-fit">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Sign up for a new account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            {errorMsg && <small className="error">{errorMsg}</small>}

            <div className="col-span-6 sm:col-span-3 flex flex-col gap-2">
              <Input
                placeholder="First name"
                type="text"
                id="firstName"
                register={register("firstName", {
                  required: "This field is required",
                })}
              />
              {errors.firstName && (
                <small className="error">{errors.firstName.message}</small>
              )}
            </div>

            <div className="col-span-6 sm:col-span-3 flex flex-col gap-2">
              <Input
                placeholder="Last name"
                register={register("lastName", {
                  required: "This field is required",
                })}
                type="text"
                id="lastName"
              />
              {errors.lastName && (
                <small className="error">{errors.lastName.message}</small>
              )}
            </div>

            <div className="col-span-6 sm:col-span-4 flex flex-col gap-2">
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

            <div className="col-span-6 sm:col-span-4 flex flex-col gap-2">
              <Input
                placeholder="Username"
                type="text"
                id="username"
                register={register("username", {
                  required: "This field is required",
                })}
              />
              {errors.email && (
                <small className="error">{errors.email.message}</small>
              )}
            </div>

            <div className="col-span-6 sm:col-span-4 flex flex-col gap-2">
              <Input
                placeholder="Password"
                id="password"
                type="password"
                register={register("password", {
                  required: "This field is required",
                  validate: {
                    isValidPassword: (val) => {
                      return (
                        passwordRegex.test(val) ||
                        "Password must be at least 8 characters long and contain capital and small, letters, numbers, and special characters"
                      );
                    },
                  },
                })}
              />
              {errors.password && (
                <small className="error">{errors.password.message}</small>
              )}
            </div>

            <div className="col-span-6 sm:col-span-4 flex flex-col gap-2">
              <Input
                placeholder="Confirm password"
                id="confirmPassword"
                type="password"
                register={register("confirmPassword", {
                  required: "This field is required",
                  validate: {
                    doPasswordsMatch: (val) => {
                      return (
                        getValues().password === val || "Passwords don't match"
                      );
                    },
                  },
                })}
              />
              {errors.confirmPassword && (
                <small className="error">
                  {errors.confirmPassword.message}
                </small>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <BiLoaderAlt
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
