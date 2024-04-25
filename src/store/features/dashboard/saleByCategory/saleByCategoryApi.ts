import { baseApi } from "@/store/api/baseApi";

export const saleByCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Amount data
    getSaleByCateagory: build.query({
      query: (data) => ({
        url: `/dashboard/order-amount-by-category?${data}`,
        method: "GET",
        data,
      }),
      providesTags: ["sale-by-category"],
    }),
  }),
});

export const { useGetSaleByCateagoryQuery } = saleByCategoryApi;
