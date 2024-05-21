import { createSlice } from "@reduxjs/toolkit";

type Seo = {
  metaPhoto: File | null;
  metaTitle: string;
  metaDescription: string;
  metaLocalUrl: string;
};

const initialState: Seo = {
  metaPhoto: null,
  metaTitle: "",
  metaDescription: "",
  metaLocalUrl: "",
};

const seoSlice = createSlice({
  name: "seo",
  initialState,
  reducers: {
    setMetaPhoto: (state, action) => {
      state.metaPhoto = action.payload;
    },
    setMetaTitle: (state, action) => {
      state.metaTitle = action.payload;
    },
    setMetaDescription: (state, action) => {
      state.metaDescription = action.payload;
    },
    setMetaLocalUrl: (state, action) => {
      state.metaLocalUrl = action.payload;
    },
  },
});

export const {
  setMetaPhoto,
  setMetaTitle,
  setMetaDescription,
  setMetaLocalUrl,
} = seoSlice.actions;
export default seoSlice.reducer;
