import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AllOrderReportDetailsState = {
  last30Days: string;
  last60Days: string;
  currentDate: string;
};

const formatDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

const initialState: AllOrderReportDetailsState = {
  last30Days: formatDate(
    new Date(new Date().setDate(new Date().getDate() - 30))
  ), // Set to 30 days ago
  last60Days: formatDate(
    new Date(new Date().setDate(new Date().getDate() - 60))
  ), // Set to 60 days ago
  currentDate: formatDate(new Date()), // Initialize currentDate as current date
};

const allOrderReportDetails = createSlice({
  name: "allOrderReportDetails",
  initialState,
  reducers: {},
});
export const {} = allOrderReportDetails.actions;
export default allOrderReportDetails.reducer;
