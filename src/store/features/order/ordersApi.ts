import { baseApi } from "@/store/api/baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Onlie sales
    getAllOnlineOrders: build.query({
      query: (query: string) => ({
        url: "/online-order?" + query,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getAllOnlineOrdersByBuyerUserId: build.query({
      query: (id) => ({
        url: `/online-order?buyer.userId=${id}`,
        method: "GET",
      }),
      providesTags: ["sales"],
    }),

    // get a single online sales

    getOnlineOrdersById: build.query({
      query: (id) => ({
        url: `/online-order/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    // update order status
    updateOrderStatus: build.mutation({
      query: (data) => ({
        url: `/online-order/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetAllOnlineOrdersQuery,
  useGetOnlineOrdersByIdQuery,
  useUpdateOrderStatusMutation,
  useGetAllOnlineOrdersByBuyerUserIdQuery,
} = ordersApi;
