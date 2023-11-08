import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../environment/env";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Category", "Note"],
  endpoints: () => ({}),
});
