import { ILoginFormInput, IRegisterFormInput, IUser } from "../../types/types";
import { apiSlice } from "./apiSlice";

interface IUserResponse {
  message: string;
  user: IUser;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),

    getOneUser: builder.query<IUser, number>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),

    register: builder.mutation<IUserResponse, IRegisterFormInput>({
      query: (data) => ({
        url: `/users/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation<IUserResponse, ILoginFormInput>({
      query: (data) => ({
        url: `/users/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.query<{ message: string }, void>({
      query: () => "/users/logout",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetOneUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useLazyLogoutQuery,
} = userApiSlice;
