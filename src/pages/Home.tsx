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
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { user } = useContext(UserContext);

  const id: string = JSON.parse(localStorage.getItem("userData")!).id;

  const getNotes = async (): Promise<NoteType[]> => {
    try {
      const response = await axios.get(`${API_URL}/notes/getAll/${id}`);
      console.log(
        [...response.data]
          .filter((note) => note.pinned)
          .concat([...response.data].filter((note) => !note.pinned))
      );

      return [...response.data]
        .filter((note) => note.pinned)
        .concat([...response.data].filter((note) => !note.pinned));
    } catch (error: any) {
      return error;
    }
  };

  // Access the client
  // const queryClient = useQueryClient();

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

  // const handleSearch = (query: ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery((prev) => prev + query.target.value);
  //   console.log(
  //     [...data[Symbol.iterator]()].filter((note) =>
  //       note.title.includes(query.target.value)
  //     )
  //   );

  // };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex-grow mb-8">
      <h1 className="my-8 text-xl text-center gray-800 p-4 bg-yellow-200 border border-yellow-300 shadow-sm rounded-sm dark:text-gray-800">
        Hey {firstName}, start your day by creating a new note!
      </h1>
      {/* <div className="form-control mb-8">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered rounded-none"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
      </div> */}
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered input-md text-base w-full max-w-xs mb-8"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
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
          {data
            ?.filter(
              (note) =>
                note.title.toLowerCase().includes(searchQuery) ||
                note.text.toLowerCase().includes(searchQuery)
            )
            .map((note: any) => (
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
