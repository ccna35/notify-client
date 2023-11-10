import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/Inputs/Input";
import {
  useAddNewCategoryMutation,
  useGetAllCategoriesQuery,
} from "../app/api/categoryApiSlice";
import { cn } from "../utils/utils";
import CategoriesContainer from "../components/Categories/CategoriesContainer";
import NotesLoader from "../components/SkeletonLoaders/NotesLoader";
import { CategoryType } from "../types/types";
import { BiLoaderAlt } from "react-icons/bi";
import NewCategory from "../components/Categories/NewCategory";

export default function Categories() {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   resetField,
  //   formState: { errors },
  // } = useForm<ICategoryFormInput>({ mode: "onChange" });

  // const [addCategory, { isLoading }] = useAddNewCategoryMutation();

  const {
    data,
    isError,
    error,
    isLoading: isCategoriesLoading,
  } = useGetAllCategoriesQuery();

  if (isError) {
    console.log(error);
  }

  // const [errorMsg, setErrorMsg] = useState("");

  // const onSubmit: SubmitHandler<ICategoryFormInput> = async (data) => {
  //   setErrorMsg("");
  //   try {
  //     await addCategory(data).unwrap();
  //     resetField("category_name");
  //   } catch (error: any) {
  //     console.log(error);
  //     if (error.status === 400) {
  //       setErrorMsg(error.data.message);
  //     }
  //   }
  // };

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <section className="py-16 bg-slate-50 min-h-screen dark:bg-slate-950">
      <div className="container">
        {/* <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  type="text"
                  id="category_name"
                  placeholder="Category name"
                  register={register("category_name", {
                    required: "This field is required",
                    validate: {
                      contentLength: (val) => {
                        return (
                          (val.length >= 3 && val.length <= 20) ||
                          "Category name should be between 3 and 20 characters"
                        );
                      },
                    },
                  })}
                />
                {watch("category_name") && (
                  <span
                    className={cn(
                      "p-1 rounded-md border text-base w-fit dark:bg-slate-900 dark:text-slate-200 dark:border-gray-600",
                      {
                        "border-red-500 dark:border-red-500":
                          errors.category_name,
                        "border-green-500 dark:border-green-500":
                          !errors.category_name,
                      }
                    )}
                  >
                    {watch("category_name").length}/20
                  </span>
                )}
              </div>
              {errors.category_name && (
                <small className="error w-fit">
                  {errors.category_name.message}
                </small>
              )}
              {errorMsg && <small className="error w-fit">{errorMsg}</small>}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <BiLoaderAlt
                  className="h-5 w-5 text-indigo-100 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                "Add New"
              )}
            </button>
          </div>
        </form> */}

        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          onClick={openModal}
        >
          Add New Category
        </button>
        {isCategoriesLoading ? (
          <div className="mt-8 flex gap-4">
            <NotesLoader />
            <NotesLoader />
            <NotesLoader />
          </div>
        ) : (
          <CategoriesContainer categories={data as CategoryType[]} />
        )}
      </div>
      <NewCategory isOpen={isOpen} closeModal={closeModal} />
    </section>
  );
}
