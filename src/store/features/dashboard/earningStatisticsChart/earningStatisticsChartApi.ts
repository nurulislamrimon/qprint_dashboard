import { baseApi } from "@/store/api/baseApi";

export const earningStatisticsChartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Amount data
    getEarningChartAllAmount: build.query({
      query: (query: string) => ({
        url: `/dashboard/order-amount?${query}`,
        method: "GET",
      }),
      providesTags: ["eaning-statistics-chart-all-amount"],
    }),
  }),
});

export const { useGetEarningChartAllAmountQuery } = earningStatisticsChartApi;
