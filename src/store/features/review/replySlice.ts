import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Reply = {
  reply: string;
  id: string;
};

const initialState: Reply = {
  reply: "",
  id: "",
};

const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {
    setReply: (state, action: PayloadAction<string>) => {
      state.reply = action.payload;
    },
    setIsEdited: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    clearReplyData: (state) => {
      state.reply = "";
    },
  },
});

export const { setReply, setIsEdited, clearReplyData } = replySlice.actions;

export default replySlice.reducer;
