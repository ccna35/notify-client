import axios from "axios";
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useRef,
  useState,
} from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { NoteType } from "./Home";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export default function New() {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [isPinned, setIsPinned] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: {
      title: string;
      text: string;
      userId: string;
      pinned: boolean;
    }) => {
      return axios.post<NoteType>("http://localhost:3000/notes/new", newNote);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setTitle("");
      setText("");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const handleToggle = () => {
    // console.log("Before: ", pinned);
    // setPinned((prev) => !prev);
    // pinned ? setPinned(false) : setPinned(true);
    if (isPinned) {
      setIsPinned(false);
    } else {
      setIsPinned(true);
    }
    console.log("After: ", isPinned);
  };

  return (
    <div className="mt-10 sm:mt-0 sm:p-8">
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate({
                title,
                text,
                userId: JSON.parse(localStorage.getItem("userData")!).id,
                pinned: isPinned,
              });
            }}
          >
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      placeholder="Note title..."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <textarea
                      id="noteText"
                      name="noteText"
                      rows={10}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Write your note here..."
                      onChange={(e) => setText(e.target.value)}
                      value={text}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-50 px-4 py-3 sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? "Loading..." : "Add New Note"}
                </button>

                <div className="inline-flex gap-2 items-center">
                  <label
                    className="text-sm font-medium text-gray-400"
                    htmlFor="pinned"
                  >
                    Pin this note to the top?
                  </label>
                  <input
                    type="checkbox"
                    name="pinned"
                    id="pinned"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => console.log(e.target.checked)}
                  />
                  {/* <div
                    className={`w-6 h-6 rounded-full ${
                      isPinned ? "bg-blue-600" : "bg-red-600"
                    }`}
                    onClick={handleToggle}
                  ></div> */}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
