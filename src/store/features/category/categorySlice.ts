import { createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";

type CategoryType = {
  categoryName: string;
  categoryPhoto: File | null;
  categoryLocalUrl: string;
};

const initialState: CategoryType = {
  categoryName: "",
  categoryPhoto: null,
  categoryLocalUrl: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryName: (state, action) => {
      state.categoryName = action.payload;
    },
    setCategoryPhoto: (state, action) => {
      state.categoryPhoto = action.payload;
    },
    setCategoryLocalUrl: (state, action) => {
      state.categoryLocalUrl = action.payload;
    },
  },
});

export const { setCategoryName, setCategoryPhoto, setCategoryLocalUrl } =
  categorySlice.actions;
export default categorySlice.reducer;
