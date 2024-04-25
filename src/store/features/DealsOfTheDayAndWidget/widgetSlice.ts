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
}

const initialState: IWidgetState | Record<string, unknown> = {};

const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    setDeals: (state, action: PayloadAction<Partial<IWidgetState> | false>) => {
      if (action.payload === false) {
        return initialState;
      } else {
        return {
          ...state,
          ...action.payload,
        };
      }
    },
    resetDeals: (state) => {
      return initialState;
    },
  },
});

export const { setDeals, resetDeals } = widgetSlice.actions;

export default widgetSlice.reducer;
