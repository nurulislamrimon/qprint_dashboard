import { baseApi } from "@/store/api/baseApi";

export const topSellingProductApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Business Analytics data
    getTopSellingProduct: build.query({
      query: (query: string) => ({
        url: "/product?sortBy=averageRating?" + query,
        method: "GET",
      }),
      providesTags: ["top-selling-product"],
    }),
  }),
});

export const { useGetTopSellingProductQuery } = topSellingProductApi;
