import { baseApi } from "@/store/api/baseApi";

export const onlineOrderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Onlie sales
    onlineAllSales: build.query({
      query: (query: string) => ({
        url: "/online-order?" + query,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    //get all Online Order Placed sales
    getOnlineOrder: build.query({
      query: (query: string) => ({
        url: `/online-order?${query}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    // create brand
    createSales: build.mutation({
      query: (data) => ({
        url: "/online-order/add",
        method: "POST",
        data,
      }),
      invalidatesTags: ["order"],
    }),

    // get a single online sales

    onlineSales: build.query({
      query: (id) => ({
        url: `/online-order/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});

export const {
  useOnlineAllSalesQuery,
  useCreateSalesMutation,
  useOnlineSalesQuery,
  useGetOnlineOrderQuery,
} = onlineOrderApi;
