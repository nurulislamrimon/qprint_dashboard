// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  email: string;
  password: string;
}

const initialState: AuthState = {
  email: "",
  password: "",
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
  },
});

export const { setPhoneNumber, setPassword } = authSlice.actions;
export default authSlice.reducer;
