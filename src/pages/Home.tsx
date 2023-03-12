import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Note from "../components/Note";
import Spinner from "../components/Loaders/Spinner";
import { useContext } from "react";
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

  console.log(user.name);

  const id: string = JSON.parse(localStorage.getItem("userData")!).id;

  const getNotes = async (): Promise<NoteType[]> => {
    try {
      const response = await axios.get(`${API_URL}/notes/getAll/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error(error);
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

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex-grow mb-8">
      <h1 className="my-8 text-xl text-center gray-800 p-4 bg-yellow-200 border border-yellow-300 shadow-sm rounded-sm">
        Hey {user.name.split(" ")[0]}, start your day by creating a new note!
      </h1>
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
