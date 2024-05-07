import { baseApi } from "@/store/api/baseApi";

export const businessAnalyticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Business Analytics data
    getbusinessAnalytics: build.query({
      query: (query: string) => ({
        url: `/dashboard/order-counted?${query}`,
        method: "GET",
      }),
      providesTags: ["business-analytics"],
    }),
  }),
});

export const { useGetbusinessAnalyticsQuery } = businessAnalyticsApi;
