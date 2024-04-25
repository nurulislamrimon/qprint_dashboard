import { baseApi } from "@/store/api/baseApi";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get user data
    customers: build.query({
      query: (data) => ({
        url: `/user?sortBy=orders&isVerified=true&role=User`,
        method: "GET",
        data,
      }),
      providesTags: ["customer"],
    }),

    // get a single user

    customer: build.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["customer"],
    }),
  }),
});

export const { useCustomerQuery, useCustomersQuery } = customerApi;
