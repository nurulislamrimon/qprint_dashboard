import { baseApi } from "@/store/api/baseApi";

export const printingSetupApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get printing-setup data
    allPrintingSetup: build.query({
      query: (data) => ({
        url: "/printing-setup",
        method: "GET",
        data,
      }),
      providesTags: ["printing-setup"],
    }),

    // get all paper size
    allPaperSize: build.query({
      query: (data) => ({
        url: "/printing-setup?printingSetupType=Paper Size",
        method: "GET",
        data,
      }),
      providesTags: ["printing-setup"],
    }),

    // get all paper types
    allPaperType: build.query({
      query: (data) => ({
        url: "/printing-setup?printingSetupType=Paper Type",
        method: "GET",
        data,
      }),
      providesTags: ["printing-setup"],
    }),

    // get paper size unit
    paperUnit: build.query({
      query: (data) => ({
        url: "/printing-setup?printingSetupType=Paper Size Unit",
        method: "GET",
        data,
      }),
      providesTags: ["printing-setup"],
    }),

    // get all printing mode
    allPrintingMode: build.query({
      query: (data) => ({
        url: "/printing-setup?printingSetupType=Printing Color Mode",
        method: "GET",
        data,
      }),
      providesTags: ["printing-setup"],
    }),
    // create printing-setup
    createPrintingSetup: build.mutation({
      query: (data) => ({
        url: "/printing-setup/add",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["printing-setup"],
    }),

    // get a single printing-setup

    printingSetup: build.query({
      query: (id) => ({
        url: `/printing-setup/${id}`,
        method: "GET",
      }),
      providesTags: ["printing-setup"],
    }),

    // update printing-setup
    updatePrintingSetup: build.mutation({
      query: (data) => ({
        url: `/printing-setup/${data.id}`,
        method: "PUT",
        data: data.data,
      }),
      invalidatesTags: ["printing-setup"],
    }),

    //delete printing-setup

    deletePrintingSetup: build.mutation({
      query: (id) => ({
        url: `/printing-setup/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["printing-setup"],
    }),
  }),
});

export const {
  usePrintingSetupQuery,
  useCreatePrintingSetupMutation,
  useAllPaperSizeQuery,
  useAllPrintingModeQuery,
  useAllPaperTypeQuery,
  useDeletePrintingSetupMutation,
  useUpdatePrintingSetupMutation,
  usePaperUnitQuery,
} = printingSetupApi;
