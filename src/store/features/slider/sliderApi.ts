import { baseApi } from "@/store/api/baseApi";

export const sliderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get slider
    getSlider: build.query({
      query: (data) => ({
        url: "/promotions/slider",
        method: "GET",
        data,
      }),
      providesTags: ["slider"],
    }),
    // create slider
    addSlider: build.mutation({
      query: (data) => ({
        url: "/promotions/slider/add",
        method: "POST",
        data,
      }),
      invalidatesTags: ["slider"],
    }),
  }),
});

export const { useGetSliderQuery, useAddSliderMutation } = sliderApi;
