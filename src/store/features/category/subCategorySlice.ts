import { createSlice } from "@reduxjs/toolkit";

type SubCategoryType = {
  subcategoryName: string;
};

const initialState = {
  subcategoryName: "",
};

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    setSubCategory: (state, action) => {
      state.subcategoryName = action.payload;
    },
  },
});

export const { setSubCategory } = subCategorySlice.actions;
export default subCategorySlice.reducer;
