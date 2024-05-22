// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  email: string;
  password: string;
  isDayExtended?: boolean;
}

const initialState: AuthState = {
  email: "",
  password: "",
  isDayExtended: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setIsDayExtended: (state, action: PayloadAction<boolean>) => {
      state.isDayExtended = action.payload;
    },
  },
});

export const { setPhoneNumber, setPassword, setIsDayExtended } =
  authSlice.actions;
export default authSlice.reducer;
