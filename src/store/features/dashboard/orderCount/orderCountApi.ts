import { baseApi } from "@/store/api/baseApi";

export const orderCountApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all Amount data
    getAllOrderCount: build.query({
      query: (query: string) => ({
        url: `/dashboard/order-counted?${query}`,
        method: "GET",
      }),
      providesTags: ["order-counted"],
    }),
  }),
});

export const { useGetAllOrderCountQuery } = orderCountApi;
