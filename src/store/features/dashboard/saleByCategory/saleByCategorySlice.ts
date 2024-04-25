import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type saleByCategoryType = {
  saleByCategory: string;
};

const initialState: saleByCategoryType = {
  saleByCategory: "",
};

const saleByCategorySlice = createSlice({
  name: "saleByCategoryType",
  initialState,
  reducers: {
    setSalsByCategory: (state, action: PayloadAction<string>) => {
      state.saleByCategory = action.payload;
    },
  },
});

export const { setSalsByCategory } = saleByCategorySlice.actions;

export default saleByCategorySlice.reducer;
