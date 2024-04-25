import { baseApi } from "@/store/api/baseApi";

export const orderReportChartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Amount data
    getOrderReport: build.query({
      query: (data) => ({
        url: `/dashboard/order-summary?${data}`,
        method: "GET",
        data,
      }),
      providesTags: ["order-Reports"],
    }),
  }),
});

export const { useGetOrderReportQuery } = orderReportChartApi;
