import { baseApi } from "@/store/api/baseApi";

export const bestDealsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get best-deals
    getBestDeals: build.query({
      query: (query: string) => ({
        url: "/promotions/best-deals?" + query,
        method: "GET",
      }),
      providesTags: ["best-deals"],
    }),
    // create best-deals
    addBestDeals: build.mutation({
      query: (data) => ({
        url: "/promotions/best-deals/add",
        method: "POST",
        data,
      }),
      invalidatesTags: ["best-deals"],
    }),
  }),
});

export const { useGetBestDealsQuery, useAddBestDealsMutation } = bestDealsApi;
