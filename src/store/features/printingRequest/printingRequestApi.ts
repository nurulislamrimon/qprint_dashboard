import { baseApi } from "@/store/api/baseApi";

export const printingRequestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get printing request data
    printingRequests: build.query({
      query: (query: string) => ({
        url: `/printing-request?${query}`,
        method: "GET",
      }),
      providesTags: ["printing-request"],
    }),

    // get a single printing request

    printingRequestById: build.query({
      query: (id) => ({
        url: `/printing-request/${id}`,
        method: "GET",
      }),
      providesTags: ["printing-request"],
    }),

    // Update Printing request status
    updatePrintingRequestStatus: build.mutation({
      query: (data) => ({
        url: `/printing-request/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
      invalidatesTags: ["printing-request"],
    }),
  }),
});

export const {
  usePrintingRequestByIdQuery,
  usePrintingRequestsQuery,
  useUpdatePrintingRequestStatusMutation,
} = printingRequestApi;
