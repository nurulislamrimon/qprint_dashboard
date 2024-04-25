import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUpdatePasswordState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialState: IUpdatePasswordState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const updatePasswordSlice = createSlice({
  name: "updatePassword",
  initialState,
  reducers: {
    setOldPassword: (state, action: PayloadAction<string>) => {
      state.oldPassword = action.payload;
    },
    setNewPassword: (state, action: PayloadAction<string>) => {
      state.newPassword = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
  },
});

export const { setOldPassword, setNewPassword, setConfirmPassword } =
  updatePasswordSlice.actions;
export default updatePasswordSlice.reducer;
