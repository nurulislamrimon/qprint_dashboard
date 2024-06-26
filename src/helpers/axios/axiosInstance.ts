// axiosInstance.js
import { authkey } from "@/constants/storageKey";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "";
instance.defaults.headers["Accept"] = "";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authkey);
    if (accessToken) {
      config.headers.Authorization = `bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject = {
      data: response?.data,
      meta: response?.data,
    };
    return responseObject;
  },
  function (error) {
    // const responseObject = {
    //   statusCode: error?.response?.data?.statusCode || 500,
    //   message: error?.response?.data?.message || "Something went wrong",
    //   errorMessages: error?.response?.data?.errorMessages || [],
    // };
    // return responseObject;
    throw error;
  }
);

export { instance };
