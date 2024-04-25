import { baseApi } from "@/store/api/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    products: build.query({
      query: (data) => ({
        url: "/product/admin",
        method: "GET",
        data,
      }),
      providesTags: ["product"],
    }),
    // get individual product
    getSingleProduct: build.query({
      query: (id) => ({
        url: `/product/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    // search products

    searchProduct: build.query({
      query: (data) => ({
        url: `/product?${data}`,
        method: "GET",
      }),
      providesTags: ["product-search"],
    }),

    // create product

    createProduct: build.mutation({
      query: (data) => {
        return {
          url: "/product/add",
          method: "POST",
          data: data,
        };
      },
      invalidatesTags: ["product"],
    }),

    // update product
    updateProduct: build.mutation({
      query: (data) => ({
        url: `/product/${data.id}`,
        method: "PUT",
        data: data.data,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useProductsQuery,
  useSearchProductQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
