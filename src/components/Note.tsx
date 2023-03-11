import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { ErrorInfo, FC, FunctionComponent, useState } from "react";
import { NoteType } from "../pages/Home";
import { motion } from "framer-motion";
import Modal from "react-modal";

const Note: FunctionComponent<NoteType> = (note) => {
  const newDate = dayjs(note.createdAt).format("ddd MMM YYYY h:m A");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string | undefined) => {
      return axios.delete(`http://localhost:3000/notes/delete/${id}`);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      // width: "30rem",
      width: "min(90%, 30rem)",
      // maxWidth: "90%",
      transition: "all 1s",
    },
  };

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement("#root");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <motion.div
      className="p-5 flex flex-col gap-4 self-start justify-between overflow-hidden rounded-md bg-white shadow-sm duration-500 hover:shadow-md border hover:border-gray-400"
      layout
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {note.pinned && (
        <p className="text-sm p-2 rounded-sm bg-slate-200 self-start">Pinned</p>
      )}

      <h2 className="text-lg font-medium w-11/12 truncate">{note.title}</h2>
      <p className="text-gray-700 text-lg self-start w-11/12 truncate">
        {note.text}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-sm p-2 rounded-sm bg-slate-200 self-start">
          {newDate}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer hover:text-red-600 transition"
          // onClick={() => {
          //   mutation.mutate(note._id);
          // }}
          onClick={openModal}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this note? This action cannot be
              undone.
            </p>
          </div>
          <div className="bg-gray-50 sm:flex gap-4 mt-4">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto transition"
              onClick={() => {
                mutation.mutate(note._id);
              }}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Loading..." : "Delete"}
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </motion.div>
  );
};

export default Note;
