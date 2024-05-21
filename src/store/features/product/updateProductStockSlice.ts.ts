import { createSlice } from "@reduxjs/toolkit";

interface InStock {
  inStock: number;
}

const initialState: InStock = {
  inStock: 0,
};

const updateProductStockSlice = createSlice({
  name: "updateProductStock",
  initialState,
  reducers: {
    setStock: (state, action) => {
      state.inStock = action.payload;
    },
  },
});

export const { setStock } = updateProductStockSlice.actions;
export default updateProductStockSlice.reducer;
