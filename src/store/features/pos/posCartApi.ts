import { baseApi } from "@/store/api/baseApi";

export const posCartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create pos order
    createPosCart: build.mutation({
      query: (data) => ({
        url: "/offline-sale/add",
        method: "POST",
        data,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useCreatePosCartMutation } = posCartApi;
