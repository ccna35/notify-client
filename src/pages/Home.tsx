import { isError, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Note from "../components/Note";
import Spinner from "../components/Loaders/Spinner";
import { ChangeEvent, useContext, useState } from "react";
import { UserContext, useUserStore } from "../App";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

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
  const darkMode = useUserStore((state) => state.darkMode);
  const accessToken = useUserStore((state) => state.token);
  const updateToken = useUserStore((state) => state.updateToken);

  const { user, setUser } = useContext(UserContext);

  const [cookies, setCookies] = useCookies(["access_token"]);

  // const token: string = cookies.access_token;

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const id: string = JSON.parse(localStorage.getItem("userData")!).id;

  const getNotes = async (): Promise<NoteType[]> => {
    try {
      const response = await axios.get(`${API_URL}/notes/getAll/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(
        [...response.data]
          .filter((note) => note.pinned)
          .concat([...response.data].filter((note) => !note.pinned))
      );

      return [...response.data]
        .filter((note) => note.pinned)
        .concat([...response.data].filter((note) => !note.pinned));
    } catch (error: any) {
      console.log("Catch error: ", error);

      if (error) {
        setCookies("access_token", "");
        updateToken("");
        localStorage.removeItem("userData");
        setUser({
          name: "",
          email: "",
          status: false,
        });
        navigate("/login");
      }

      return error;
    }
  };

  // Access the client
  // const queryClient = useQueryClient();

  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    onError: (error: any) => {
      console.log("onError: ", error);
    },
  });

  let firstName: string = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData")!).firstName
    : user
    ? user.name.split(" ")[0]
    : "N/A";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  console.log(data);

  return (
    <div
      className={`mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex-grow mb-8  ${
        darkMode && "dark"
      }`}
    >
      <h1 className="my-8 text-xl text-center gray-800 p-4 bg-yellow-200 border border-yellow-300 shadow-sm rounded-sm dark:text-gray-800">
        Hey {firstName}, start your day by creating a new note!
      </h1>

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
          {Array.isArray(data) &&
            data
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
