import { baseApi } from "@/store/api/baseApi";

export const seoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get shipping data
    getSeo: build.query({
      query: (data) => ({
        url: "/settings/home-page-meta",
        method: "GET",
        data,
      }),
      providesTags: ["seo"],
    }),
    // create shipping
    createSeo: build.mutation({
      query: (data) => ({
        url: "/settings/home-page-meta",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["seo"],
    }),
  }),
});

export const { useGetSeoQuery, useCreateSeoMutation } = seoApi;
