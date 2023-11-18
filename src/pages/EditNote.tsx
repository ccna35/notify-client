import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/Inputs/Input";
import { cn } from "../utils/utils";
import {
  useGetOneNoteQuery,
  useUpdateNoteMutation,
} from "../app/api/noteApiSlice";
import { useGetAllCategoriesQuery } from "../app/api/categoryApiSlice";
import { BiLoaderAlt } from "react-icons/bi";
import NewCategory from "../components/Categories/NewCategory";
import { IFormInput } from "./NewNote";
import NotePageLoader from "../components/SkeletonLoaders/NotePageLoader";

export default function EditNote() {
  const { id: stringId } = useParams();

  const id = Number(stringId);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "onChange" });

  const { isLoading: isNoteLoading, data } = useGetOneNoteQuery(id);

  const [updateNote, { isLoading: isNewNoteLoading }] = useUpdateNoteMutation();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await updateNote({ id, data }).unwrap();

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: categories,
    isError,
    error,
    isLoading: isCategoriesLoading,
  } = useGetAllCategoriesQuery();

  if (isError) {
    console.log(error);
  }

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <section className="py-16 bg-slate-50 min-h-screen grid dark:bg-slate-950">
      <div className="container">
        {data == undefined ? (
          <NotePageLoader />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Input
                    defaultValue={data[0].note_title}
                    type="text"
                    id="note_title"
                    placeholder="Note title..."
                    register={register("note_title", {
                      required: "This field is required",
                      validate: {
                        maxContent: (val) => {
                          return (
                            val.length <= 100 ||
                            "Title should be 100 characters max"
                          );
                        },
                      },
                    })}
                  />
                  {watch("note_title") && (
                    <span
                      className={cn("p-1 rounded-md text-base w-fit", {
                        " text-red-500": errors.note_title,
                        "text-green-500": !errors.note_title,
                      })}
                    >
                      {watch("note_title").length}%
                    </span>
                  )}
                </div>
                {errors.note_title && (
                  <small className="error w-fit">
                    {errors.note_title.message}
                  </small>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <textarea
                  defaultValue={data[0].note_body}
                  id="note_body"
                  rows={10}
                  className="border p-2 block w-full rounded-md border-gray-400 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-900 dark:text-slate-200 dark:border-gray-600"
                  placeholder="Write your note here..."
                  {...register("note_body", {
                    required: "This field is required",
                    validate: {
                      maxContent: (val) => {
                        return (
                          val.length <= 1000 ||
                          "Text should be 1000 characters max"
                        );
                      },
                    },
                  })}
                />
                {watch("note_body") && (
                  <span
                    className={cn("p-1 rounded-md text-base w-fit", {
                      " text-red-500": errors.note_body,
                      "text-green-500": !errors.note_body,
                    })}
                  >
                    {watch("note_body").length / 10}%
                  </span>
                )}

                {errors.note_body && (
                  <small className="error w-fit">
                    {errors.note_body.message}
                  </small>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {isCategoriesLoading ? (
                <p>Loading...</p>
              ) : (
                // <CategoryMenu categories={categories as CategoryType[]} />
                <div className="flex items-center flex-wrap gap-4">
                  <select
                    {...register("category")}
                    className="p-2 rounded-md w-52 border border-indigo-200 dark:bg-slate-900 dark:text-slate-200 dark:border-gray-600"
                    defaultValue={data[0].category}
                  >
                    {categories!.map((cat) => {
                      return (
                        <option
                          value={cat.id}
                          key={cat.id}
                          className="text-indigo-700 dark:text-slate-200"
                        >
                          {cat.category_name}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                    onClick={openModal}
                  >
                    Add New Category
                  </button>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={isNewNoteLoading}
                >
                  {isNewNoteLoading ? (
                    <BiLoaderAlt
                      className="h-5 w-5 text-indigo-100 animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    "Update"
                  )}
                </button>

                <div className="inline-flex gap-2 items-center">
                  <label
                    className="text-sm font-medium text-gray-400"
                    htmlFor="isPinned"
                  >
                    Pin it to the top?
                  </label>
                  <input
                    defaultChecked={data[0].isPinned === 1}
                    type="checkbox"
                    id="isPinned"
                    {...register("isPinned")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
      <NewCategory isOpen={isOpen} closeModal={closeModal} />
    </section>
  );
}
