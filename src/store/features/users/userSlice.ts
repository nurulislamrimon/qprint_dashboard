import { createSlice } from "@reduxjs/toolkit";

type userType = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  phoneNumber: string;
  profilePhoto: File | null;
  userLocalUrl: string;
};

const initialState: userType = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  phoneNumber: "",
  profilePhoto: null,
  userLocalUrl: "",
};

const userAdminSlice = createSlice({
  name: "addAdmin",
  initialState,
  reducers: {
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAdminPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    clearUserData: (state) => {
      return initialState;
    },
    setProfilePhoto: (state, action) => {
      state.profilePhoto = action.payload;
    },
    setUserLocalUrl: (state, action) => {
      state.userLocalUrl = action.payload;
    },
  },
});

export const {
  setFullName,
  setEmail,
  setAdminPhoneNumber,
  setPassword,
  setConfirmPassword,
  setRole,
  clearUserData,
  setProfilePhoto,
  setUserLocalUrl,
} = userAdminSlice.actions;

export default userAdminSlice.reducer;
