import { baseApi } from "@/store/api/baseApi";

export const specialOfferApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get shipping data
    getSpecialOffer: build.query({
      query: (query: string) => ({
        url: "/settings/special-offer?" + query,
        method: "GET",
      }),
      providesTags: ["shipping-charge"],
    }),
    // create shipping
    addSpecialOffer: build.mutation({
      query: (data) => ({
        url: "/settings/special-offer",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["shipping-charge"],
    }),
  }),
});

export const { useGetSpecialOfferQuery, useAddSpecialOfferMutation } =
  specialOfferApi;
