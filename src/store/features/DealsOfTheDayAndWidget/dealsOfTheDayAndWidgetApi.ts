import { baseApi } from "@/store/api/baseApi";

export const dealsOfTheDayAndWidgetApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get deals and widget
    getDealsOfTheDayAndWidget: build.query({
      query: (data) => ({
        url: "/promotions/deals-of-the-day",
        method: "GET",
        data,
      }),
      providesTags: ["deals-of-the-day-and-widget"],
    }),
    // create deals and wedget
    addDealsOfTheDayAndWidget: build.mutation({
      query: (data) => ({
        url: "/promotions/deals-of-the-day/add",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["deals-of-the-day-and-widget"],
    }),
  }),
});

export const {
  useGetDealsOfTheDayAndWidgetQuery,
  useAddDealsOfTheDayAndWidgetMutation,
} = dealsOfTheDayAndWidgetApi;
