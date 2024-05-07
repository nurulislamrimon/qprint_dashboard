import { baseApi } from "@/store/api/baseApi";

export const orderReportChartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Amount data
    getOrderReport: build.query({
      query: (query: string) => ({
        url: `/dashboard/order-summary?${query}`,
        method: "GET",
      }),
      providesTags: ["order-Reports"],
    }),
  }),
});

export const { useGetOrderReportQuery } = orderReportChartApi;
