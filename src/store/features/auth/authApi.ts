import { baseApi } from "@/store/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: "/user/login",
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: ["user"],
    }),

    // get me
    getMe: build.query({
      query: (data) => ({
        url: "/user/me",
        method: "GET",
        data,
      }),
      providesTags: ["user"],
    }),

    // update me
    updateMe: build.mutation({
      query: (data) => ({
        url: "/user/update",
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["user"],
    }),
    // update password
    updatePassword: build.mutation({
      query: (data) => ({
        url: "/user/change-password",
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useUpdatePasswordMutation,
} = authApi;
