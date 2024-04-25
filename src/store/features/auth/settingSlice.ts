// WidgetSlice.ts (Redux slice)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserSetting {
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePhoto: File | null;
}

const initialState: IUserSetting | Record<string, unknown> = {};

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
  },
});

export const { setSetting } = settingSlice.actions;

export default settingSlice.reducer;
