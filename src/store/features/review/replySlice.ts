import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Reply = {
  reply: string;
  isEdited: boolean;
};

const initialState: Reply = {
  reply: "",
  isEdited: false,
};

const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {
    setReply: (state, action: PayloadAction<string>) => {
      state.reply = action.payload;
    },
    setIsEdited: (state, action: PayloadAction<boolean>) => {
      state.isEdited = action.payload;
    },
    clearReplyData: (state) => {
      state.reply = "";
    },
  },
});

export const { setReply, setIsEdited, clearReplyData } = replySlice.actions;

export default replySlice.reducer;
