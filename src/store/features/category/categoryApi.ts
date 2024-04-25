import { baseApi } from "@/store/api/baseApi";

export const categoryApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get category data
    categories: build.query({
      query: (query: string) => ({
        url: "/category?" + query,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    // create category
    createCategory: build.mutation({
      query: (data) => ({
        url: "/category/add",
        method: "POST",
        data,
      }),
      invalidatesTags: ["category"],
    }),

    // get a single category

    category: build.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    // update category
    updateCategory: build.mutation({
      query: (data) => ({
        url: `/category/${data.id}`,
        method: "PUT",
        data: data.formData,
      }),
      invalidatesTags: ["category"],
    }),
    // update sub category
    updateSubCategory: build.mutation({
      query: (data) => ({
        url: `/category/${data.id}`,
        method: "PUT",
        data: data.data,
      }),
      invalidatesTags: ["category"],
    }),

    //delete category

    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useCategoriesQuery,
  useCategoryQuery,
  useUpdateCategoryMutation,
  useUpdateSubCategoryMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
