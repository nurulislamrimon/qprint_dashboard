import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Shippinigcharge = {
  inside: number;
  outside: number;
  freeShippingMinOrderAmount: number;
};

const initialState: Shippinigcharge = {
  inside: 0,
  outside: 0,
  freeShippingMinOrderAmount: 0,
};

const shippingChargeSlice = createSlice({
  name: "shippingCharge",
  initialState,
  reducers: {
    setInsideAmount: (state, action: PayloadAction<number>) => {
      state.inside = action.payload;
    },
    setOutsideAmount: (state, action: PayloadAction<number>) => {
      state.outside = action.payload;
    },

    setfreeShippingAmount: (state, action: PayloadAction<number>) => {
      state.freeShippingMinOrderAmount = action.payload;
    },
  },
});

export const { setInsideAmount, setOutsideAmount, setfreeShippingAmount } =
  shippingChargeSlice.actions;
export default shippingChargeSlice.reducer;
