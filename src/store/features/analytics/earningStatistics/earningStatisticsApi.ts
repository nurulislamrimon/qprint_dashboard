import { baseApi } from "@/store/api/baseApi";

export const earningStatisticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Amount data
    getEarningStatistics: build.query({
      query: (data) => ({
        url: "/user?sortBy=orders",
        method: "GET",
        data,
      }),
      providesTags: ["order-Reports"],
    }),
  }),
});

export const { useGetEarningStatisticsQuery } = earningStatisticsApi;
