// WidgetSlice.ts (Redux slice)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IWidgetState {
  title: string;
  tag: string;
  description: string;
  buttonText: string;
  link: string;
  productPhoto: File | null;
  discount: number;
  fieldName?: string;
  dealsOfThedayFile: Record<string, File>;
  productSearch: string;
  productId: string;
  productName: string;
}

const initialState: IWidgetState | Record<string, unknown> = {};

const dealsOfTheDaySlice = createSlice({
  name: "dealsOfTheDaySlice",
  initialState,
  reducers: {
    setDealsOfTheDay: (
      state,
      action: PayloadAction<Partial<IWidgetState> | false>
    ) => {
      if (action.payload === false) {
        return initialState;
      } else {
        return {
          ...state,
          ...action.payload,
        };
      }
    },
    setDealsOfTheDayFiles: (state, action) => {
      if (state.dealsOfThedayFile) {
        state.dealsOfThedayFile = {
          ...state.dealsOfThedayFile,
          ...action.payload,
        };
      } else {
        state.dealsOfThedayFile = action.payload;
      }
    },
    resetSearch: (state) => {
      return {
        ...state,
        productSearch: "",
      };
    },
    resetProduct: (state) => {
      return {
        ...state,
        productId: "",
        productName: "",
        productPhoto: null,

        link: "",
        title: "Please add title",
      };
    },
    resetDealsOfTheDay: (state) => {
      return initialState;
    },
  },
});

export const {
  setDealsOfTheDay,
  resetDealsOfTheDay,
  setDealsOfTheDayFiles,
  resetSearch,
  resetProduct,
} = dealsOfTheDaySlice.actions;

export default dealsOfTheDaySlice.reducer;
