import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface IUserSetting {
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePhoto: File | null;
}

const initialState: IUserSetting | Record<string, any> = {
  fullName: "",
  email: "",
  phoneNumber: "974",
  profilePhoto: null,
  profilePhotoFile: {},
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSetting: (
      state,
      action: PayloadAction<Partial<IUserSetting> | false>
    ) => {
      if (action.payload === false) {
        return initialState;
      } else {
        return {
          ...state,
          ...action.payload,
        };
      }
    },
    setProfilePhotFile: (state, action) => {
      state.profilePhotoFile = action.payload;
    },
  },
});

export const { setSetting, setProfilePhotFile } = settingSlice.actions;

export default settingSlice.reducer;
