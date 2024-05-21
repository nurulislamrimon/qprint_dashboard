import { baseApi } from "./baseApi";
export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: (query: string) => ({
        url: "/user?" + query,
        method: "GET",
      }),
    }),
  }),
});

export const { useUsersQuery } = usersApi;
