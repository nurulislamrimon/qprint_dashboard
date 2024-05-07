import { baseApi } from "@/store/api/baseApi";

export const reviewApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get review data
    reviews: build.query({
      query: (query: string) => ({
        url: "/review?" + query,
        method: "GET",
      }),
      providesTags: ["brand"],
    }),

    // review with reply
    reviewWithReply: build.query({
      query: (query: string) => ({
        url: "/review?reply=true&" + query,
        method: "GET",
      }),
      providesTags: ["brand"],
    }),

    // review with no reply
    reviewWithoutReply: build.query({
      query: (query: string) => ({
        url: "/review?reply=false&" + query,
        method: "GET",
      }),
      providesTags: ["brand"],
    }),
    // create review
    createReview: build.mutation({
      query: (data) => ({
        url: "/review/add",
        method: "POST",
        data,
      }),
      invalidatesTags: ["brand"],
    }),

    // get a single review

    review: build.query({
      query: (id) => ({
        url: `/review/${id}`,
        method: "GET",
      }),
      providesTags: ["brand"],
    }),

    // update  review with reply
    updateReview: build.mutation({
      query: (data) => ({
        url: `/review/reply/${data.id}`,
        method: "PUT",
        data: { reply: data.reply },
      }),
      invalidatesTags: ["brand"],
    }),

    //delete review

    deleteReview: build.mutation({
      query: (id) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
    }),
  }),
});

export const {
  useReviewsQuery,
  useReviewQuery,
  useUpdateReviewMutation,
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useReviewWithReplyQuery,
  useReviewWithoutReplyQuery,
} = reviewApi;
