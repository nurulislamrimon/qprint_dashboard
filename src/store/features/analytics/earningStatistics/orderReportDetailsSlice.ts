// dateSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  startDate30: new Date(),
  endDate30: new Date(),
  startDate60: new Date(),
  endDate60: new Date(),
};

const orderReportDetailsSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setStartDate30(state, action) {
      state.startDate30 = action.payload;
    },
    setEndDate30(state, action) {
      state.endDate30 = action.payload;
    },
    setStartDate60(state, action) {
      state.startDate60 = action.payload;
    },
    setEndDate60(state, action) {
      state.endDate60 = action.payload;
    },
  },
});

export const {
  setStatus,
  setStartDate30,
  setEndDate30,
  setStartDate60,
  setEndDate60,
} = orderReportDetailsSlice.actions;

export default orderReportDetailsSlice.reducer;
