import { baseApi } from "@/store/api/baseApi";

export const totalSelsSummarysApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Amount data
    getTotalSoldAmount: build.query({
      query: (query: string) => ({
        url:
          "/dashboard/total-order-amount?orderStatus.status=Delivered&" + query,
        method: "GET",
      }),
      providesTags: ["order-Reports"],
    }),
    getProductSold: build.query({
      query: (query: string) => ({
        url: `/dashboard/total-order-items?${query}`,
        method: "GET",
      }),
      providesTags: ["order-Reports"],
    }),
    getAllUsers: build.query({
      query: (query: string) => ({
        url: `/user?sortBy=orders&${query}`,
        method: "GET",
      }),
      providesTags: ["order-Reports"],
    }),
  }),
});

export const {
  useGetTotalSoldAmountQuery,
  useGetProductSoldQuery,
  useGetAllUsersQuery,
} = totalSelsSummarysApi;
