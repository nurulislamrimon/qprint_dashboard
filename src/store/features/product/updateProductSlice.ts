import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  product: any;
  productFiles: any;
  deleteProductPhotos: string[];
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
  deleteProductPhotos: [],
  isLoading: false,
};

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {
    setUpdateProduct: (state, action) => {
      state.product = { ...state.product, ...action.payload };
    },
    setUpdateProductFiles: (state, action) => {
      state.productFiles = { ...state.productFiles, ...action.payload };
    },
    setDeleteProductPhotos: (state, action) => {
      state.deleteProductPhotos = [
        ...state.deleteProductPhotos,
        action.payload,
      ];
    },
    clearUpdateProductState: (state) => {
      state.product = initialState.product;
      state.productFiles = initialState.productFiles;
      state.deleteProductPhotos = initialState.deleteProductPhotos;
      state.isLoading = initialState.isLoading;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const {
  setUpdateProduct,
  setUpdateProductFiles,
  setDeleteProductPhotos,
  clearUpdateProductState,
  setIsLoading,
} = updateProductSlice.actions;

export default updateProductSlice.reducer;
