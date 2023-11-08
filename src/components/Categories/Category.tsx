import dayjs from "dayjs";
import { Fragment, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import EditCategory from "./EditCategory";

type CategoryProps = {
  id: number;
  category_name: string;
  createdAt: string;
};

const Category = ({ id, createdAt, category_name }: CategoryProps) => {
  const navigate = useNavigate();

  dayjs.extend(relativeTime);
  const newDate = dayjs(createdAt).fromNow();

  // const [isOpen, setIsOpen] = useState(false);

  // const [deleteNote, { isLoading }] = useDeleteNoteMutation();

  // const handleDelete = async () => {
  //   try {
  //     const res = await deleteNote(id).unwrap();
  //     console.log(res);
  //     setIsOpen(false);
  //   } catch (error) {
  //     setIsOpen(false);
  //     console.log(error);
  //   }
  // };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="p-3 flex gap-4 rounded-md bg-white shadow-sm duration-500 hover:shadow-md border hover:border-slate-400 dark:bg-slate-900 dark:border-slate-800">
      <h2 className="text-lg font-medium dark:text-slate-200">
        {category_name}
      </h2>
      <div className="flex justify-between items-center">
        {/* <p className="text-sm p-2 rounded-sm bg-slate-200 self-start dark:bg-slate-600 dark:text-slate-300">
          {newDate}
        </p> */}

        {category_name !== "Uncategorized" && (
          <BiEdit
            onClick={openModal}
            size={25}
            className="text-indigo-600 hover:text-yellow-400 cursor-pointer transition"
          />
        )}

        <EditCategory id={id} isOpen={isOpen} closeModal={closeModal} />

        {/* <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsOpen(false)}
          >
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-slate-900"
                    >
                      Are you sure you want to delete this note?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-slate-500">
                        If you delete this note, it will be moved temporarily to
                        the archive & will be deleted permanently in 30 days
                        unless you move it back to the active notes.
                      </p>
                    </div>

                    <div className="mt-4 flex gap-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-blue-100 hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        // onClick={handleDelete}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition> */}
      </div>
    </div>
  );
};

export default Category;
