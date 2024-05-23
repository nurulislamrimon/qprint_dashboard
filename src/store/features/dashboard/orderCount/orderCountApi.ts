import { baseApi } from "@/store/api/baseApi";

export const orderCountApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Online Order data
    getAllOnlineOrderCount: build.query({
      query: (query: string) => ({
        url: `/dashboard/online-order-counted?${query}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    //get all Quick Order data
    getAllQuickOrderCount: build.query({
      query: (query: string) => ({
        url: `/dashboard/quick-order-counted?${query}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    //get all Pos Offline Order data
    getAllPosOfflineOrderCount: build.query({
      query: (query: string) => ({
        url: `/dashboard/offline-sale-counted?${query}`,
        method: "GET",
      }),
      providesTags: ["sales"],
    }),
    //get all Product Order data
    getAllProductCount: build.query({
      query: (query: string) => ({
        url: `/dashboard/product-counted?${query}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    //get all Stock Alart  Order data
    getAllStockAlertCount: build.query({
      query: (query: string) => ({
        url: `/dashboard/stock-alert-counted?${query}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllOnlineOrderCountQuery,
  useGetAllQuickOrderCountQuery,
  useGetAllPosOfflineOrderCountQuery,
  useGetAllProductCountQuery,
  useGetAllStockAlertCountQuery,
} = orderCountApi;
