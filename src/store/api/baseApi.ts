import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: [
    "user",
    "brand",
    "category",
    "sales",
    "order",
    "customer",
    "printing-setup",
    "shipping-charge",
    "quick-order",
    "business-analytics",
    "deals-of-the-day-and-widget",
    "slider",
    "top-selling-product",
    "eaning-statistics-chart-all-amount",
    "sale-by-category",
    "order-Reports",
    "seo",
    "product",
    "product-search",
    "best-deals",
    "social-media",
  ],
});
