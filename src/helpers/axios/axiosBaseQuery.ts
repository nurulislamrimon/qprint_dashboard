// axiosBaseQuery.js
import { IMeta } from "@/types";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { instance as axiosInstance } from "./axiosInstance";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      meta?: IMeta;
      contentType?: string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, contentType }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...headers,
          "Content-Type": contentType,
        },
      });

      return result;
    } catch (axiosError) {
      // const err = axiosError as AxiosError;
      // return {
      //   error: {
      //     status: err.response?.status,
      //     data: err.response,
      //   },
      // };
      const err = axiosError as AxiosError;
      const errorData = err.response?.data || {
        status: err.response?.status || 500,
        message: "Something went wrong",
        errorMessages: [],
      };

      // Strip out non-serializable parts of the error response
      const serializableErrorData = {
        status: err.response?.status,
        data: {
          ...errorData,
          headers: undefined, // Exclude headers
        },
      };

      return {
        error: serializableErrorData,
      };
    }
  };
