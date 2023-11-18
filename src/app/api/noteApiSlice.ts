import { IFormInput } from "../../pages/NewNote";
import { NoteType } from "../../types/types";
import { apiSlice } from "./apiSlice";

type ArgsType = {
  user_id: number;
  searchQuery: string;
  isPinned?: string | boolean;
  category: string | number;
};

interface IEditNote {
  id: number;
  data: IFormInput;
}

export const noteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserNotes: builder.query<NoteType[], ArgsType>({
      query: ({ user_id, searchQuery, isPinned, category }) =>
        `/notes/${user_id}/?search=${searchQuery}&category=${category}`,
      providesTags: ["Note"],
    }),

    getAllNotes: builder.query({
      query: () => `/notes`,
      providesTags: ["Note"],
    }),

    getOneNote: builder.query<NoteType[], number>({
      query: (id) => `/notes/single/${id}`,
      providesTags: ["Note"],
    }),

    addNewNote: builder.mutation<string, IFormInput>({
      query: (data) => ({
        url: `/notes`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Note"],
    }),

    updateNote: builder.mutation<string, IEditNote>({
      query: ({ id, data }) => ({
        url: `/notes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Note"],
    }),

    deleteNote: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note"],
    }),
  }),
});

export const {
  useGetUserNotesQuery,
  useLazyGetUserNotesQuery,
  useAddNewNoteMutation,
  useGetAllNotesQuery,
  useDeleteNoteMutation,
  useGetOneNoteQuery,
  useUpdateNoteMutation,
} = noteApiSlice;
