import { IFormInput } from "../../pages/New";
import { NoteType } from "../../types/types";
import { apiSlice } from "./apiSlice";

type ArgsType = {
  user_id: number;
  searchQuery: string;
  isPinned: string | boolean;
  category: string | number;
};

export const noteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserNotes: builder.query<NoteType[], ArgsType>({
      query: ({ user_id, searchQuery, isPinned, category }) =>
        `/notes/${user_id}/?search=${searchQuery}&isPinned=${isPinned}&category=${category}`,
      providesTags: ["Note"],
    }),

    getAllNotes: builder.query({
      query: () => `/notes`,
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
} = noteApiSlice;
