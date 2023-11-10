import { useState, Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddNewCategoryMutation } from "../../app/api/categoryApiSlice";
import Input from "../Inputs/Input";
import { cn } from "../../utils/utils";
import { BiLoaderAlt } from "react-icons/bi";
import { ICategoryFormInput } from "../../types/types";
import { Dialog, Transition } from "@headlessui/react";

type AddCategoryProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const NewCategory = ({ isOpen, closeModal }: AddCategoryProps) => {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<ICategoryFormInput>({ mode: "onChange" });

  const [addCategory, { isLoading, data }] = useAddNewCategoryMutation();
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit: SubmitHandler<ICategoryFormInput> = async (data) => {
    setErrorMsg("");
    try {
      const res = await addCategory(data).unwrap();
      console.log(res);

      resetField("category_name");
    } catch (error: any) {
      console.log(error);
      if (error.status === 400) {
        setErrorMsg(error.data.message);
      }
    }
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-900 dark:border-slate-800">
                {/* <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-200"
                >
                  Payment successful
                </Dialog.Title> */}
                <div className="mt-2">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-6 flex-grow">
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
                        {data && (
                          <small className="success w-fit">
                            {data.message}
                          </small>
                        )}
                        {errorMsg && (
                          <small className="error w-fit">{errorMsg}</small>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-2">
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
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewCategory;
