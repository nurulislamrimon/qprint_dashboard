import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BrandState {
  brandName: string;
  brandPhoto: File | null;
  brandId: string | null;
  brandlocalUrl: string; // New field to store the ID of the brand being edited
}

const initialState: BrandState = {
  brandName: "",
  brandPhoto: null,
  brandId: null,
  brandlocalUrl: "",
};

const createBrandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrandName: (state, action: PayloadAction<string>) => {
      state.brandName = action.payload;
    },
    setBrandPhoto: (state, action: PayloadAction<File>) => {
      state.brandPhoto = action.payload;
    },
    setBrandId: (state, action: PayloadAction<string>) => {
      state.brandId = action.payload;
    },
    setBrandlocalUrl: (state, action: PayloadAction<string>) => {
      state.brandlocalUrl = action.payload;
    },
    clearBrandData: (state) => {
      state.brandName = "";
      state.brandPhoto = null;
      state.brandId = null;
    },
  },
});

export const {
  setBrandName,
  setBrandPhoto,
  setBrandId,
  setBrandlocalUrl,
  clearBrandData,
} = createBrandSlice.actions;
export default createBrandSlice.reducer;
