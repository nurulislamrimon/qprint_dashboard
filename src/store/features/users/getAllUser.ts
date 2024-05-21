// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJwREhKeGM4UEY4IiwiX2lkIjoiNjViZTNmYTZhNDlkOTRjZWM3MDQ3M2Y1IiwiZnVsbE5hbWUiOiJOIEkgUmltb24iLCJyb2xlIjoiQWRtaW4iLCJwaG9uZU51bWJlciI6IjAxNzE1NDk0ODQ2IiwiaXNQaG9uZU51bWJlclZlcmlmaWVkIjp0cnVlLCJpc0VtYWlsVmVyaWZpZWQiOmZhbHNlLCJpYXQiOjE3MDk1NDk1OTEsImV4cCI6MTcwOTYzNTk5MX0.hyz1TJglz8D_A1EDuGTpBGRXPJ2yfms7iLRWnd4uM10";

// // const url = "http://5.182.33.12:5000/api/v1";

// // const allUserEndpoint = baseApi.injectEndpoints({
// //   endpoints: (build) => ({
// //     allUser: build.query({
// //       query: () => ({
// //         url: `${baseURL}/user`,
// //         method: "GET",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }),
// //     }),
// //   }),
// // });

// export const getAllUser = createApi({
//   reducerPath: "user",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://5.182.33.12:5000/api/v1" }),
//   endpoints: (builder) => ({
//     getAllUser: builder.query({
//       query: () => ({
//         url: "/user",
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }),
//     }),
//   }),
// });

// export const { useGetAllUserQuery } = getAllUser;
