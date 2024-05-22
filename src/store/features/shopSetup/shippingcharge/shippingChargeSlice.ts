import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Shippinigcharge = {
  inside: number;
  outside: number;
  freeShippingMinOrderAmount: number;
  isFreeShippingActive: boolean;
};

const initialState: Shippinigcharge = {
  inside: 0,
  outside: 0,
  freeShippingMinOrderAmount: 0,
  isFreeShippingActive: false,
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
    setIsFreeShippingActive: (state, action: PayloadAction<boolean>) => {
      state.isFreeShippingActive = action.payload;
    },
  },
});

export const {
  setInsideAmount,
  setOutsideAmount,
  setfreeShippingAmount,
  setIsFreeShippingActive,
} = shippingChargeSlice.actions;
export default shippingChargeSlice.reducer;
