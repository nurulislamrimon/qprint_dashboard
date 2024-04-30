import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  product: any;
  productFiles: any;
  isLoading: boolean;
} = {
  product: {
    specifications: [
      {
        sectionName: "General",
        blocks: [{ title: "", description: "" }],
      },
    ],
    shortDescription: "",
    description: "",
  },
  productFiles: {},
  isLoading: false,
};

const addProductSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    setAddProduct: (state, action) => {
      state.product = { ...state.product, ...action.payload };
    },
    setAddProductFiles: (state, action) => {
      state.productFiles = { ...state.productFiles, ...action.payload };
    },
    clearAddProductState: (state) => {
      state.product = initialState.product;
      state.productFiles = initialState.productFiles;
      state.isLoading = initialState.isLoading;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const {
  setAddProduct,
  setAddProductFiles,
  clearAddProductState,
  setIsLoading,
} = addProductSlice.actions;

export default addProductSlice.reducer;
