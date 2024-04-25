import { baseApi } from "@/store/api/baseApi";

export const businessAnalyticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Business Analytics data
    getbusinessAnalytics: build.query({
      query: (data) => ({
        url: `/dashboard/order-counted?${data}`,
        method: "GET",
        data,
      }),
      providesTags: ["business-analytics"],
    }),

  }),
});

export const {
  useGetbusinessAnalyticsQuery,
} = businessAnalyticsApi;
