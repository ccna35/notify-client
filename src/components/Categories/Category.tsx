import dayjs from "dayjs";
import { Fragment, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { BiEdit, BiLoaderAlt } from "react-icons/bi";
import EditCategory from "./EditCategory";
import { useDeleteCategoryMutation } from "../../app/api/categoryApiSlice";

type CategoryProps = {
  id: number;
  category_name: string;
};

const Category = ({ id, category_name }: CategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const [deleteErrorMsg, setDeleteErrorMsg] = useState("");

  const handleDelete = async () => {
    try {
      const res = await deleteCategory(id).unwrap();
      setIsOpen(false);
    } catch (error) {
      setIsOpen(false);
      if (error.data.message.code === "ER_ROW_IS_REFERENCED_2") {
        setDeleteErrorMsg(
          "Category can't be deleted because it's associated with other notes"
        );
      }
    }
  };

  return (
    <div className="p-3 flex gap-4 rounded-md bg-white shadow-sm duration-500 hover:shadow-md border hover:border-slate-400 dark:bg-slate-900 dark:border-slate-800">
      <h2 className="text-lg font-medium dark:text-slate-200">
        {category_name}
      </h2>
      {category_name !== "Uncategorized" && (
        <div className="flex justify-between items-center">
          <BiEdit
            onClick={openModal}
            size={25}
            className="text-indigo-600 hover:text-yellow-400 cursor-pointer transition"
          />

          <EditCategory
            id={id}
            isOpen={isOpen}
            closeModal={closeModal}
            category_name={category_name}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer text-red-600 hover:text-red-400 transition"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>

          <Transition appear show={isDeleteModalOpen} as={Fragment}>
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
                <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col gap-4">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-slate-900"
                      >
                        Are you sure you want to delete this note?
                      </Dialog.Title>
                      <div className="">
                        <p className="text-sm text-slate-500">
                          If you delete this note, it will be moved temporarily
                          to the archive & will be deleted permanently in 30
                          days unless you move it back to the active notes.
                        </p>
                      </div>

                      {deleteErrorMsg && (
                        <small className="error w-fit">{deleteErrorMsg}</small>
                      )}

                      <div className="flex gap-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={handleDelete}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <BiLoaderAlt
                              className="h-5 w-5 text-red-100 animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            "Delete"
                          )}
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setIsDeleteModalOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      )}
    </div>
  );
};

export default Category;
