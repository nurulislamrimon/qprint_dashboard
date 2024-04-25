import { baseApi } from "@/store/api/baseApi";

export const earningStatisticsChartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Amount data
    getEarningChartAllAmount: build.query({
      query: (data) => ({
        url: `/dashboard/order-amount?${data}`,
        method: "GET",
        data,
      }),
      providesTags: ["eaning-statistics-chart-all-amount"],
    }),
  }),
});

export const { useGetEarningChartAllAmountQuery } = earningStatisticsChartApi;
