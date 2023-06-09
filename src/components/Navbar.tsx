import { Fragment, useContext, useState } from "react";
import { Disclosure, Menu, Transition, Switch } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useCookies from "react-cookie/cjs/useCookies";
import { UserContext, useUserStore } from "../App";

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Register", href: "#", current: false },
  { name: "Login", href: "#", current: false },
  { name: "New", href: "#", current: false },
  { name: "Premium", href: "#", current: false, special: true },
];

function classNames<T, G>(T: string, G: string) {
  return T + " " + G;
}

export default function Navbar() {
  const [enabled, setEnabled] = useState<boolean>(false);

  const updateTheme = useUserStore((state) => state.updateTheme);
  const darkMode = useUserStore((state) => state.darkMode);

  const { user, setUser } = useContext(UserContext);

  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const signOut = () => {
    setCookies("access_token", "");
    localStorage.removeItem("userData");
    setUser({
      name: "",
      email: "",
      status: false,
    });
    navigate("/login");
  };

  // This array includes the pages we don't want to show if the user is already signed in;
  const publicPages: string[] = ["Register", "Login"];
  // This array includes the pages we don't want to show if the user isn't signed in;
  const privatePages: string[] = ["Home", "New", "Premium"];

  let checkUser: boolean = user.status
    ? true
    : localStorage.getItem("userData")
    ? true
    : false;

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
                    {navigation
                      .filter((item) =>
                        user.status || localStorage.getItem("userData")
                          ? !publicPages.includes(item.name)
                          : !user.status
                          ? !privatePages.includes(item.name)
                          : item
                      )
                      .map((item) => (
                        <NavLink
                          to={item.name.toLowerCase()}
                          key={item.name}
                          className={classNames(
                            item.current
                              ? `bg-gray-900 text-white`
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            `px-3 py-2 rounded-md text-sm font-medium ${
                              item.special && "bg-yellow-400 text-gray-700"
                            }`
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                  </div>
                </div>
              </div>
              {checkUser && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <Switch
                    checked={darkMode}
                    onChange={() => updateTheme()}
                    className={`${
                      darkMode ? "bg-blue-600" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        darkMode ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={signOut}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation
                .filter((item) =>
                  user.status || localStorage.getItem("userData")
                    ? !publicPages.includes(item.name)
                    : !user.status
                    ? !privatePages.includes(item.name)
                    : item
                )
                .map((item) => (
                  <Link
                    key={item.name}
                    to={item.name.toLowerCase()}
                    className={classNames(
                      item.current
                        ? `bg-gray-900 text-white`
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      `block px-3 py-2 rounded-md text-base font-medium ${
                        item.special && "text-yellow-400 text-gray-700"
                      }`
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
