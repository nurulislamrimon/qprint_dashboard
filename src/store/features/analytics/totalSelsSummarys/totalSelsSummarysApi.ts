import { baseApi } from "@/store/api/baseApi";

export const totalSelsSummarysApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Amount data
    getTotalSoldAmount: build.query({
      query: (data) => ({
        url: "/dashboard/total-order-amount?orderStatus.status=Delivered&",
        method: "GET",
        data,
      }),
      providesTags: ["order-Reports"],
    }),
    getProductSold: build.query({
      query: (data) => ({
        url: `/dashboard/total-order-items?${data}`,
        method: "GET",
        data,
      }),
      providesTags: ["order-Reports"],
    }),
    getAllUsers: build.query({
      query: (data) => ({
        url: `/user?sortBy=orders`,
        method: "GET",
        data,
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
