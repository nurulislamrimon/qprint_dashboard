import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SliderType = {
  sliderTitle: string;
  backgroundColor: string;
  backgroundPhoto: string;
  productPhoto: string;
  sliderTag: string;
  title: string;
  price: number;
  discountPercentage: number;
  buttonText: string;
  link: string;
  description: string;

  // for background photo and color switcher
  isBgColorSelected: boolean;

  sliderFiles: Record<string, File>;
};

const initialState: SliderType | {} = {};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    setSlider: (state, action: PayloadAction<Partial<SliderType>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setSliderFiles: (
      state: { sliderFiles?: Record<string, File> },
      action: PayloadAction<Record<string, File>>
    ) => {
      if (state?.sliderFiles) {
        state.sliderFiles = {
          ...state.sliderFiles,
          ...action.payload,
        };
      } else {
        state.sliderFiles = action.payload;
      }
    },
    resetSlider() {
      return initialState;
    },
  },
});

export const { setSlider, resetSlider, setSliderFiles } = sliderSlice.actions;
export default sliderSlice.reducer;
