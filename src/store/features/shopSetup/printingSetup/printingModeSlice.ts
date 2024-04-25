import { createSlice } from "@reduxjs/toolkit";

type PrintingColorMode = {
  printingSetupType: string;
  printingColorMode: string;
  price: number | null;
};

const initialState: PrintingColorMode = {
  printingSetupType: "Printing Color Mode",
  printingColorMode: "",
  price: null,
};

const printingModeSlice = createSlice({
  name: "printingColorMode",
  initialState,
  reducers: {
    setPrintingMode: (state, action) => {
      state.printingColorMode = action.payload;
    },
    setPrintingModePrice: (state, action) => {
      state.price = action.payload;
    },
    
  },
});

export const { setPrintingMode, setPrintingModePrice } = printingModeSlice.actions;
export default printingModeSlice.reducer;