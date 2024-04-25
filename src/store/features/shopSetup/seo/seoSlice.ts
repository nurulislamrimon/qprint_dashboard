import { createSlice } from "@reduxjs/toolkit";

type Seo = {
  metaPhoto: File | null;
  metaTitle: string;
  metaDescription: string;
};

const initialState: Seo = {
    metaPhoto: null,
  metaTitle: "",
  metaDescription: "",
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
  },
});

export const { setMetaPhoto, setMetaTitle, setMetaDescription } =
  seoSlice.actions;
export default seoSlice.reducer;
