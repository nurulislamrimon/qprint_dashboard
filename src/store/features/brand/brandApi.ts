import { baseApi } from "@/store/api/baseApi";

export const brandApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get brands data
    brands: build.query({
      query: (query: string) => ({
        url: "/brand?" + query,
        method: "GET",
      }),
      providesTags: ["brand"],
    }),
    // create brand
    createBrand: build.mutation({
      query: (data) => ({
        url: "/brand/add",
        method: "POST",
        data,
      }),
      invalidatesTags: ["brand"],
    }),

    // get a single brand

    brand: build.query({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "GET",
      }),
      providesTags: ["brand"],
    }),

    // update brand
    updateBrand: build.mutation({
      query: (data) => ({
        url: `/brand/${data.id}`,
        method: "PUT",
        data: data.formData,
      }),
      invalidatesTags: ["brand"],
    }),

    //delete brand

    deleteBrand: build.mutation({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
    }),
  }),
});

export const {
  useBrandsQuery,
  useBrandQuery,
  useUpdateBrandMutation,
  useCreateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
