import { baseApi } from "@/store/api/baseApi";

export const socialMediaApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get social media data
    getSocialMedia: build.query({
      query: (query?: string) => ({
        url: "/settings/social-media?" + query,
        method: "GET",
      }),
      providesTags: ["social-media"],
    }),
    // create social media
    createSocialMedia: build.mutation({
      query: (data) => ({
        url: "/settings/social-media",
        method: "POST",
        data,
      }),
      invalidatesTags: ["social-media"],
    }),
  }),
});

export const { useGetSocialMediaQuery, useCreateSocialMediaMutation } =
  socialMediaApi;
