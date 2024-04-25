import { baseApi } from "@/store/api/baseApi";

export const quickOrderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get shipping data
    getQuickOrderCharge: build.query({
      query: (data) => ({
        url: "/settings/quick-order-setting",
        method: "GET",
        data,
      }),
      providesTags: ["quick-order"],
    }),
    // create shipping
    addQuickOrderCharge: build.mutation({
      query: (data) => ({
        url: "/settings/quick-order-setting",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["quick-order"],
    }),
  }),
});

export const { useGetQuickOrderChargeQuery, useAddQuickOrderChargeMutation } =
  quickOrderApi;
