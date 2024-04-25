import { baseApi } from "@/store/api/baseApi";

export const offlineOrderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all ofline sales
    oflineSales: build.query({
      query: (data) => ({
        url: "/offline-sale",
        method: "GET",
        data,
      }),
      providesTags: ["sales"],
    }),
    // create brand
    createSales: build.mutation({
      query: (data) => ({
        url: "/offline-sale/add",
        method: "POST",
        data,
      }),
      invalidatesTags: ["sales"],
    }),

    // get a single ofline sales

    sales: build.query({
      query: (id) => ({
        url: `/offline-sale/${id}`,
        method: "GET",
      }),
      providesTags: ["sales"],
    }),
  }),
});

export const { useCreateSalesMutation, useOflineSalesQuery, useSalesQuery } =
  offlineOrderApi;
