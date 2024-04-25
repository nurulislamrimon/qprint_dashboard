import { createSlice } from "@reduxjs/toolkit";

interface UnitSlice {
  unit: string;
}

const initialState = {
  unit: "",
};

const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    setUnit: (state, action: { payload: string }) => {
      state.unit = action.payload;
    },
  },
});
export const { setUnit } = unitSlice.actions;
export default unitSlice.reducer;
