import { createSlice } from "@reduxjs/toolkit";

type searchProductByCategoryType = {
  searchProductByCategory: string;
};

const initialState: searchProductByCategoryType = {
  searchProductByCategory: "",
};
const searchProductByCategorySlice = createSlice({
  name: "searchProductByCategory",
  initialState,
  reducers: {
    setSearchProductByCategory: (state, action) => {
      state.searchProductByCategory = action.payload;
    },
    setSearchProductByCategoryEmpty: (state) => {
      state.searchProductByCategory = "";
    },
    resetFilterProductByCategory: () => {
      return initialState;
    },
  },
});

export const {
  setSearchProductByCategory,
  setSearchProductByCategoryEmpty,
  resetFilterProductByCategory,
} = searchProductByCategorySlice.actions;
export default searchProductByCategorySlice.reducer;
