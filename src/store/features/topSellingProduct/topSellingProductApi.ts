import { baseApi } from "@/store/api/baseApi";

export const topSellingProductApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Business Analytics data
    getTopSellingProduct: build.query({
      query: (data) => ({
        url: "/product?sortBy=averageRating",
        method: "GET",
        data,
      }),
      providesTags: ["top-selling-product"],
    }),
  }),
});

export const { useGetTopSellingProductQuery } = topSellingProductApi;
