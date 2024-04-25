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

    // get a single social media

    getSingleSocialMedia: build.query({
      query: (id) => ({
        url: `/settings/social-media/${id}`,
        method: "GET",
      }),
      providesTags: ["social-media"],
    }),

    // update social media
    updateSocialMedia: build.mutation({
      query: (data) => ({
        url: `/settings/social-media/${data.id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["social-media"],
    }),
  }),
});

export const {
  useGetSocialMediaQuery,
  useCreateSocialMediaMutation,
  useGetSingleSocialMediaQuery,
  useUpdateSocialMediaMutation,
} = socialMediaApi;
