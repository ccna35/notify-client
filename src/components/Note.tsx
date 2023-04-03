import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import {
  ErrorInfo,
  FC,
  Fragment,
  FunctionComponent,
  useContext,
  useState,
} from "react";
import { NoteType } from "../pages/Home";
import { motion } from "framer-motion";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { UserContext, useUserStore } from "../App";
import { useCookies } from "react-cookie";

const API_URL: string = import.meta.env.DE
  ? import.meta.env.VITE_REACT_DEV_API_URL
  : import.meta.env.VITE_REACT_PROD_API_URL;

const Note: FunctionComponent<NoteType> = (note) => {
  const darkMode = useUserStore((state) => state.darkMode);

  const { user, setUser } = useContext(UserContext);

  const [cookies, setCookies] = useCookies(["access_token"]);

  const token: string = cookies.access_token;

  const navigate = useNavigate();

  dayjs.extend(relativeTime);
  const newDate = dayjs(note.createdAt).fromNow();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string | undefined) => {
      return axios.delete(`${API_URL}/notes/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsOpen(false);
    },
    onError: (error: any) => {
      console.log(error);
      if (error) {
        setCookies("access_token", "");
        localStorage.removeItem("userData");
        setUser({
          name: "",
          email: "",
          status: false,
        });
        navigate("/login");
      }
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`p-5 flex flex-col gap-4 self-start justify-between overflow-hidden rounded-md bg-white shadow-sm duration-500 hover:shadow-md border hover:border-gray-400 dark:bg-base-300 dark:border-gray-800 h-60${
        darkMode && "dark"
      }`}
      layout
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {note.pinned && (
        <p className="text-sm py-1 px-2 rounded-sm bg-yellow-400 self-start dark:text-gray-700">
          Pinned
        </p>
      )}

      <h2 className="text-lg font-medium w-11/12 truncate dark:text-gray-200">
        {note.title}
      </h2>
      <p className="text-gray-700 text-lg self-start w-11/12 truncate dark:text-gray-300 flex-grow">
        {note.text}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-sm p-2 rounded-sm bg-slate-200 self-start dark:text-gray-700">
          {newDate}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer hover:text-red-600 transition"
          onClick={() => setIsOpen(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Are you sure you want to delete this note?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        If you delete this note, it will be moved temporarily to
                        the archive & will be deleted permanently in 30 days
                        unless you move it back to the active notes.
                      </p>
                    </div>

                    <div className="mt-4 flex gap-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-blue-100 hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          mutation.mutate(note._id);
                        }}
                        disabled={mutation.isLoading}
                      >
                        {mutation.isLoading ? "Loading..." : "Delete"}
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </motion.div>
  );
};

export default Note;
