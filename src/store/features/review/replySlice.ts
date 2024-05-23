import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Reply = {
  reply: string;
  id: string;
  openDeleteModal: boolean;
};

const initialState: Reply = {
  reply: "",
  id: "",
  openDeleteModal: false,
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
    setOpenDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.openDeleteModal = action.payload;
    },
  },
});

export const { setReply, setIsEdited, clearReplyData, setOpenDeleteModal } =
  replySlice.actions;

export default replySlice.reducer;
