import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition, Switch } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { clearUser, userSelector } from "../app/slices/authSlice";
import { switchTheme, themeSelector } from "../app/slices/themeSlice";
import { useAppDispatch } from "../store/store";
import { cn } from "../utils/utils";
import { useLazyLogoutQuery } from "../app/api/userApiSlice";
import { BiLoaderAlt } from "react-icons/bi";

type Page = {
  name: string;
  current: boolean;
  special?: boolean;
};

const publicPages: Page[] = [
  { name: "Register", current: false },
  { name: "Login", current: false },
];
const privatePages: Page[] = [
  { name: "Home", current: true },
  { name: "New", current: false },
  { name: "Categories", current: false },
  { name: "Premium", current: false, special: true },
];

function classNames<T, G>(T: string, G: string) {
  return T + " " + G;
}

export default function Navbar() {
  // const [enabled, setEnabled] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn } = useAppSelector(userSelector);
  const { darkMode } = useAppSelector(themeSelector);
  const dispatch = useAppDispatch();

  const [logout, { isLoading }] = useLazyLogoutQuery();

  const signOut = async () => {
    try {
      await logout();
      dispatch(clearUser());
      navigate("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-slate-950 sticky top-0">
      {({ open, close }) => (
        <>
          <div className="container">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="../calendar-svgrepo-com.svg"
                      alt="Notify"
                    />
                  </Link>

                  <Link to="/">
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="../calendar-svgrepo-com.svg"
                      alt="Notify"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {(isLoggedIn ? privatePages : publicPages).map((item) => (
                      <NavLink
                        to={item.name.toLowerCase()}
                        key={item.name}
                        className={cn(
                          "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition",
                          {
                            "bg-yellow-400 text-gray-900": item.special,
                          }
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              {isLoggedIn && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}

                  <Switch
                    checked={darkMode}
                    onChange={() => {
                      dispatch(switchTheme());
                      if (darkMode) {
                        document.documentElement.removeAttribute("class");
                      } else {
                        document.documentElement.setAttribute("class", "dark");
                      }
                    }}
                    className={`${
                      darkMode ? "bg-indigo-600" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition duration-500`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        darkMode
                          ? "translate-x-6 bg-white"
                          : "translate-x-1 bg-gray-600"
                      } inline-block h-4 w-4 transform rounded-full transition duration-500`}
                    />
                  </Switch>

                  {/* Profile dropdown */}

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="../avatar-4-svgrepo-com.svg"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute flex flex-col right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                        <Menu.Item>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            Your Profile
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link
                            to="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            Settings
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            className="px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-300 w-full"
                            onClick={signOut}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <BiLoaderAlt
                                className="h-5 w-5 text-red-500 group-hover:text-red-400 animate-spin"
                                aria-hidden="true"
                              />
                            ) : (
                              "Sign out"
                            )}
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel>
            <div className="space-y-1 px-2 pt-2 pb-3">
              {(isLoggedIn ? privatePages : publicPages).map((item) => (
                <Disclosure.Button
                  as={Link}
                  to={item.name.toLowerCase()}
                  className={classNames(
                    item.current
                      ? `bg-gray-900 text-white`
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    `block px-3 py-2 rounded-md text-base font-medium transition ${
                      item.special && "bg-yellow-400 text-gray-900"
                    }`
                  )}
                  aria-current={item.current ? "page" : undefined}
                  key={item.name}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
