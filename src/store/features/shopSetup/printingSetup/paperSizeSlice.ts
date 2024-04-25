import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PaperSize = {
  height: number | null;
  width: number | null;
  printingSetupType: string;
};

const initialState: PaperSize = {
  height: null,
  width: null,
  printingSetupType: "Paper Size",
};

const paperSizeSlice = createSlice({
  name: "paperSize",
  initialState,
  reducers: {
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    clearPaperSize: (state) => {
      state.height = null;
      state.width = null;
    },
  },
});

export const { setHeight, setWidth, clearPaperSize } = paperSizeSlice.actions;
export default paperSizeSlice.reducer;
