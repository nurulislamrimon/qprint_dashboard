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
};

const initialState: SliderType | Record<string, unknown> = {};

const offerSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    setOffer: (state, action: PayloadAction<Partial<SliderType> | false>) => {
      if (action.payload === false) {
        return initialState;
      } else {
        return {
          ...state,
          ...action.payload,
        };
      }
    },
    resetOffer(state) {
      return initialState;
    },
  },
});

export const { setOffer, resetOffer } = offerSlice.actions;
export default offerSlice.reducer;
