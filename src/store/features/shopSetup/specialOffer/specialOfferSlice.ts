import { createSlice } from "@reduxjs/toolkit";

type SpecialOfferType = {
  isSpecialOfferEnabled: boolean;
  maxAmount: number | null;
  discountPercentage: number | null;
};
const initialState = {
    isSpecialOfferEnabled: true,
    maxAmount: null,
    discountPercentage: null
}

const specialOfferSlice = createSlice({
    name: "specialOffer",
    initialState,
    reducers: {
        setMaxAmount: (state, action) => {
            state.maxAmount = action.payload
        },
        setDiscountPercentage: (state, action) => {
            state.discountPercentage = action.payload
        },

    }
});

export const { setDiscountPercentage, setMaxAmount } = specialOfferSlice.actions;
export default specialOfferSlice.reducer;