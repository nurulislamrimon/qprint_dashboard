import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInStock {
  variantName: string;
  quantity: number;
}

const initialState: IInStock[] = [];

const updateProductStockSlice = createSlice({
  name: "updateProductStock",
  initialState,
  reducers: {
    setInStock: (state, action: PayloadAction<IInStock>) => {
      const variantName = action.payload.variantName;
      const restVariants = state.filter(
        (existVariant) => existVariant.variantName !== variantName
      );

      return (state = [...restVariants, action.payload]);
    },
  },
});

export const { setInStock } = updateProductStockSlice.actions;
export default updateProductStockSlice.reducer;
