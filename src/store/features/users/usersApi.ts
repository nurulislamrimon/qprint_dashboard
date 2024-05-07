import { baseApi } from "@/store/api/baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get an admin data
    getUserById: build.query({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getAdmin: build.query({
      query: (query: string) => ({
        url: "/user?role=Admin&" + query,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    //get super admin data
    getSuperAdmin: build.query({
      query: (query: string) => ({
        url: "/user?role=Super Admin&" + query,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    //get manager data
    getManager: build.query({
      query: (query: string) => ({
        url: "/user?role=Manager&" + query,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // create brand
    createAdministrator: build.mutation({
      query: (data) => ({
        url: "/user/administrators/add",
        method: "POST",
        data,
      }),
      invalidatesTags: ["user"],
    }),

    // update administrator
    updateAdministrators: build.mutation({
      query: (data) => ({
        url: `/user/administrators/${data.id}`,
        method: "PUT",
        data: data.data,
      }),
      invalidatesTags: ["user"],
    }),

    //delete brand

    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetAdminQuery,
  useGetSuperAdminQuery,
  useGetManagerQuery,
  useCreateAdministratorMutation,
  useUpdateAdministratorsMutation,
  useDeleteAdminMutation,
} = usersApi;
