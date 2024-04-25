import { baseApi } from "@/store/api/baseApi";

export const salesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all ofline sales
    onlineOrders: build.query({
      query: (data) => ({
        url: "/online-order",
        method: "GET",
        data,
      }),
      providesTags: ["order"],
    }),

    // get a single ofline sales

    onlineOrder: build.query({
      query: (id) => ({
        url: `/online-order/${id}`,
        method: "GET",
        id,
      }),
      providesTags: ["order"],
    }),
  }),
});

export const { useOnlineOrderQuery, useOnlineOrdersQuery } = salesApi;
