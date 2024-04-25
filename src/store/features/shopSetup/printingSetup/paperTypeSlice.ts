import { createSlice } from "@reduxjs/toolkit";

type PaperType = {
  printingSetupType: string;
  paperType: string;
  price: number | null;
};

const initialState: PaperType = {
  printingSetupType: "Paper Type",
  paperType: "",
  price: null,
};

const paperTypeSlice = createSlice({
  name: "paperType",
  initialState,
  reducers: {
    setPaperType: (state, action) => {
      state.paperType = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    clearPaperTypeSlice: () => {},
  },
});

export const { setPaperType, setPrice } = paperTypeSlice.actions;
export default paperTypeSlice.reducer;
