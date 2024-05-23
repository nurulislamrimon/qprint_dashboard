import { baseApi } from "@/store/api/baseApi";

export const categoryApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get category data
    categories: build.query({
      query: (query: string) => ({
        url: "/category?" + query,
        method: "GET",
      }),
      providesTags: ["category", "subcategory"],
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
    // create subcategory
    createSubcategory: build.mutation({
      query: (data) => ({
        url: `/category/${data.id}`,
        method: "PUT",
        data: data.data,
      }),
      invalidatesTags: ["subcategory"],
    }),

    // get a single category

    category: build.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: ["individual-category"],
    }),

    // update category
    updateCategory: build.mutation({
      query: (data) => ({
        url: `/category/${data.id}`,
        method: "PUT",
        data: data.formData,
      }),
      invalidatesTags: ["individual-category", "category"],
    }),
    // delete subcategory
    deleteSubategory: build.mutation({
      query: (data) => ({
        url: `/category/${data.id}`,
        method: "PUT",
        data: data.data,
      }),
      invalidatesTags: ["subcategory"],
    }),

    // update sub category
    updateSubCategory: build.mutation({
      query: (data) => ({
        url: `/category/subcategory/${data.id}`,
        method: "PUT",
        data: data.data,
      }),
      invalidatesTags: ["subcategory"],
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
  useCreateSubcategoryMutation,
  useDeleteSubategoryMutation,
} = categoryApi;
