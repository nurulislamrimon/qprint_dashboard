import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SubCategoryType = {
  _id: string;
  categoryName: string;
  categoryPhoto: string;
  categoryIcon: string;
  subcategories: [];
};

const initialState: SubCategoryType = {
  _id: "",
  categoryName: "",
  categoryPhoto: "",
  categoryIcon: "",
  subcategories: [],
};

const subCategoryPropsSlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    setSubCategoryProps: (state, action: PayloadAction<any>) => {
      if (action.payload === false) {
        return initialState;
      } else {
        return {
          ...state,
          ...action.payload,
        };
      }
    },
  },
});

export const { setSubCategoryProps } = subCategoryPropsSlice.actions;
export default subCategoryPropsSlice.reducer;
