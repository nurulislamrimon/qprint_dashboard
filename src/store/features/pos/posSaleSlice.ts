// WidgetSlice.ts (Redux slice)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPosSales {
  additionalDiscount: number;
  orderId: string;
  orderItems: any;
  totalDiscount: number;
  totalPayable: number;
  totalPrice: number;
  totalQuantity: number;
}

const initialState: IPosSales | Record<string, unknown> = {};

const posSaleSlice = createSlice({
  name: "posSale",
  initialState,
  reducers: {
    setPosSales: (state, action: PayloadAction<Partial<IPosSales> | false>) => {
      if (action.payload === false) {
        return initialState;
      } else {
        return {
          ...state,
          ...action.payload,
        };
      }
    },
    setReset: (state) => {
      return initialState;
    },
  },
});

export const { setPosSales, setReset } = posSaleSlice.actions;

export default posSaleSlice.reducer;
