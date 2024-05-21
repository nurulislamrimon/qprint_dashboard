import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type IOffer = {
  offerTitle: string;
  backgroundColor?: string;
  backgroundPhoto?: string;
  productPhoto: string;
  title: string;
  // for first one
  price: number;
  // for second one
  offerTag: string;
  buttonText: string;
  link: string;

  // for background photo and color switcher
  isBgColorSelected: boolean;

  offerFiles: {};
};

const initialState: IOffer | {} = {};

const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    setOffer: (state, action: PayloadAction<Partial<IOffer>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    setOfferFiles: (
      state: { offerFiles?: Record<string, File> },
      action: PayloadAction<Record<string, File>>
    ) => {
      if (state?.offerFiles) {
        state.offerFiles = {
          ...state.offerFiles,
          ...action.payload,
        };
      } else {
        state.offerFiles = action.payload;
      }
    },

    resetOffer() {
      return initialState;
    },
  },
});

export const { setOffer, resetOffer, setOfferFiles } = offerSlice.actions;
export default offerSlice.reducer;
