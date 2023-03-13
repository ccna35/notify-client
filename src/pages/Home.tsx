import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Note from "../components/Note";
import Spinner from "../components/Loaders/Spinner";
import { ChangeEvent, useContext, useState } from "react";
import { UserContext } from "../App";

export type NoteType = {
  _id?: string;
  __v?: number;
  title: string;
  text: string;
  pinned?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const API_URL: string = import.meta.env.DEV
  ? import.meta.env.VITE_REACT_DEV_API_URL
  : import.meta.env.VITE_REACT_PROD_API_URL;

export default function Home() {
  const { user } = useContext(UserContext);

  const id: string = JSON.parse(localStorage.getItem("userData")!).id;

  const getNotes = async (): Promise<NoteType[]> => {
    try {
      const response = await axios.get(`${API_URL}/notes/getAll/${id}`);
      return response.data;
    } catch (error: any) {
      return error;
    }
  };

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  let firstName: string = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData")!).firstName
    : user
    ? user.name.split(" ")[0]
    : "N/A";

  const [filteredNotes, setFilteredNotes] = useState(data);

  // const handleSearch = (query: ChangeEvent<HTMLInputElement>) => {
  //   console.log(query.target.value);
  //   setFilteredNotes((prev) => prev?.includes(query.target.value));
  // };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex-grow mb-8">
      <h1 className="my-8 text-xl text-center gray-800 p-4 bg-yellow-200 border border-yellow-300 shadow-sm rounded-sm dark:text-gray-800">
        Hey {firstName}, start your day by creating a new note!
      </h1>
      <div className="form-control mb-8">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered"
          />
          <button className="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      {data?.length === 0 ? (
        <div className="text-2xl text-center flex gap-4 items-center justify-center flex-wrap">
          <p>Oops! looks like you haven't created any notes yet.</p>
          <img
            src="../sad-but-relieved-face-svgrepo-com.svg"
            alt=""
            className="h-8 w-auto"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.map((note: any) => (
            <Note
              key={note._id}
              title={note.title}
              text={note.text}
              _id={note._id}
              pinned={note.pinned}
              createdAt={note.createdAt}
              updatedAt={note.updatedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
