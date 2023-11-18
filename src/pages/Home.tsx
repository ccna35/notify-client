import { useState } from "react";
import Input from "../components/Inputs/Input";
import NotesContainer from "../components/Notes/NotesContainer";
import { useGetUserNotesQuery } from "../app/api/noteApiSlice";
import NotesLoader from "../components/SkeletonLoaders/NotesLoader";
import { NoteType } from "../types/types";
import { useGetAllCategoriesQuery } from "../app/api/categoryApiSlice";
import useDebounce from "../hooks/useDebounce";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string | number>("");

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const { isLoading, data, isFetching } = useGetUserNotesQuery(
    {
      user_id: JSON.parse(localStorage.getItem("user") || "").id,
      searchQuery: debouncedSearchQuery,
      category,
    },
    { refetchOnMountOrArgChange: true }
  );

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery();

  return (
    <section className="py-8 min-h-screen dark:bg-slate-950">
      <div className="container">
        {data && (
          <div className="flex gap-4">
            <Input
              type="search"
              placeholder="Search…"
              classNames="max-w-sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
              onClick={() =>
                setIsPinned((prev) => (prev === "all" || false ? true : false))
              }
            >
              Pinned
            </button> */}
            {!isCategoriesLoading && (
              <select
                className="p-2 rounded-md w-52 border border-indigo-200 dark:bg-slate-900 dark:text-slate-200 dark:border-gray-600"
                onChange={(e) => setCategory(e.target.value)}
              >
                {[{ id: 0, category_name: "All" }, ...categories!].map(
                  (cat) => {
                    return (
                      <option
                        value={cat.id}
                        key={cat.id}
                        className="text-indigo-700 dark:text-slate-200"
                      >
                        {cat.category_name}
                      </option>
                    );
                  }
                )}
              </select>
            )}
          </div>
        )}

        {isLoading || isFetching ? (
          <div className="mt-8 flex flex-wrap gap-4">
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
