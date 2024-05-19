import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SliderType = {
  productPhoto: File | null;
  sliderTag: string;
  title: string;
  price: number;
  discountPercentage: number;
  buttonText: string;
  link: string;
  description: string;
  discountedPrice: number;
  sliderTitle: string;
  slider: string;
  sliderLocalPhotoUrl: string;
};

const initialState: SliderType | Record<string, unknown> = {};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    setSlider: (state, action: PayloadAction<Partial<SliderType> | false>) => {
      if (action.payload === false) {
        return initialState;
      } else {
        return {
          ...state,
          ...action.payload,
        };
      }
    },
    resetSlider(state) {
      return initialState;
    },
  },
});

export const { setSlider, resetSlider } = sliderSlice.actions;
export default sliderSlice.reducer;
