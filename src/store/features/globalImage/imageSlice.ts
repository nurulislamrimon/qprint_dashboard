import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  imageSrc: null || "",
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageLoading(state, action) {
      state.loading = action.payload;
    },
    setImageSrc(state, action) {
      state.imageSrc = action.payload;
    },
  },
});

export const { setImageLoading, setImageSrc } = imageSlice.actions;
export default imageSlice.reducer;
