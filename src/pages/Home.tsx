import axios from "axios";
import Note from "../components/Notes/Note";
import Spinner from "../components/Loaders/Spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../environment/env";
import Input from "../components/Inputs/Input";
import NotesContainer from "../components/Notes/NotesContainer";
import { useGetUserNotesQuery } from "../app/api/noteApiSlice";
import NotesLoader from "../components/SkeletonLoaders/NotesLoader";
import { useAppDispatch } from "../store/store";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../app/slices/authSlice";
import { NoteType } from "../types/types";

export default function Home() {
  const navigate = useNavigate();

  const { isLoggedIn } = useAppSelector(userSelector);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  const { isLoading, isSuccess, data } = useGetUserNotesQuery({
    user_id: JSON.parse(localStorage.getItem("user") || "").id,
    searchQuery: "",
  });

  if (isSuccess) {
    console.log(data);
  }

  return (
    <section className="py-8 min-h-screen dark:bg-slate-950">
      <div className="container">
        <Input type="search" placeholder="Search…" classNames="max-w-sm" />
        {isLoading ? (
          <div className="mt-8 flex gap-4">
            <NotesLoader />
            <NotesLoader />
            <NotesLoader />
          </div>
        ) : data?.length === 0 ? (
          <div className="mt-8 text-2xl text-center flex gap-4 items-center justify-center flex-wrap">
            <p className="dark:text-slate-100">
              Oops! looks like you haven't created any notes yet.
            </p>
            <img
              src="../sad-but-relieved-face-svgrepo-com.svg"
              alt=""
              className="h-8 w-auto"
            />
          </div>
        ) : (
          <NotesContainer notes={data as NoteType[]} />
        )}
      </div>
    </section>
  );
}
