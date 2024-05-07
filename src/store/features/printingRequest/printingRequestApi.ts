import { baseApi } from "@/store/api/baseApi";

export const printingRequestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get brands data
    printingRequests: build.query({
      query: (query: string) => ({
        url: `/printing-request?${query}`,
        method: "GET",
      }),
      providesTags: ["printing-setup"],
    }),

    // get a single brand

    printingRequestById: build.query({
      query: (id) => ({
        url: `/printing-request/${id}`,
        method: "GET",
      }),
      providesTags: ["printing-setup"],
    }),
  }),
});

export const { usePrintingRequestByIdQuery, usePrintingRequestsQuery } =
  printingRequestApi;
