import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Reply = {
  reply: string;
};

const initialState: Reply = {
  reply: "",
};

const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {
    setReply: (state, action: PayloadAction<string>) => {
      state.reply = action.payload;
    },
    clearReplyData: (state) => {
      state.reply = "";
    },
  },
});

export const { setReply, clearReplyData } = replySlice.actions;

export default replySlice.reducer;
