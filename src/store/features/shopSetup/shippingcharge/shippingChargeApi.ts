import { baseApi } from "@/store/api/baseApi";

export const shippingChargeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get shipping data
    getShippingharge: build.query({
      query: (query: string) => ({
        url: "/settings/shipping-charge?" + query,
        method: "GET",
      }),
      providesTags: ["shipping-charge"],
    }),
    // create shipping
    addShippingCharge: build.mutation({
      query: (data) => ({
        url: "/settings/shipping-charge",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["shipping-charge"],
    }),
  }),
});

export const { useGetShippinghargeQuery, useAddShippingChargeMutation } =
  shippingChargeApi;
