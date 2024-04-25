import { createSlice } from "@reduxjs/toolkit";

type searchProductByCategoryType = {
  searchProductByCategory: string;
};

const initialState = {
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
  },
});

export const { setSearchProductByCategory, setSearchProductByCategoryEmpty } =
  searchProductByCategorySlice.actions;
export default searchProductByCategorySlice.reducer;
