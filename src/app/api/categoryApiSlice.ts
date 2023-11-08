import { ICategoryFormInput } from "../../pages/Categories";
import { apiSlice } from "./apiSlice";

interface ICategory {
  id: number;
  category_name: string;
  createdAt: string;
  user_id: number;
}

interface IUpdatedData extends ICategoryFormInput {
  id: number;
}

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<ICategory[], void>({
      query: () => `/categories`,
      providesTags: ["Category"],
    }),

    addNewCategory: builder.mutation<string, ICategoryFormInput>({
      query: (data) => ({
        url: `/categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<string, IUpdatedData>({
      query: (data) => ({
        url: `/categories/${data.id}`,
        method: "PUT",
        body: { category_name: data.category_name },
      }),
      invalidatesTags: ["Category"],
    }),

    // deleteNote: builder.mutation<{ message: string }, number>({
    //   query: (id) => ({
    //     url: `/categories/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Category"],
    // }),
  }),
});

export const {
  useAddNewCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} = categoryApiSlice;
