import { baseApi } from "@/store/api/baseApi";

export const quickOrderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all get add quickOrderApi sales
    getAllQuickOrder: build.query({
      query: (query: string) => ({
        url: `/quick-order?${query}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    quickOrder: build.query({
      query: (id) => ({
        url: `/quick-order/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    quickOrderUpdateOrderStatus: build.mutation({
      query: (data) => ({
        url: `/quick-order/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetAllQuickOrderQuery,
  useQuickOrderQuery,
  useQuickOrderUpdateOrderStatusMutation,
} = quickOrderApi;
