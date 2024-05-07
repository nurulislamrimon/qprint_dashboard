import { baseApi } from "@/store/api/baseApi";

export const earningStatisticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Amount data
    getEarningStatistics: build.query({
      query: (query: string) => ({
        url: "/user?sortBy=orders&" + query,
        method: "GET",
      }),
      providesTags: ["order-Reports"],
    }),
  }),
});

export const { useGetEarningStatisticsQuery } = earningStatisticsApi;
