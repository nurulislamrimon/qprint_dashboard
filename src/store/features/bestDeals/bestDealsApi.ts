import { baseApi } from "@/store/api/baseApi";

export const bestDealsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get best-deals
    getBestDeals: build.query({
      query: (data) => ({
        url: "/promotions/best-deals",
        method: "GET",
        data,
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
