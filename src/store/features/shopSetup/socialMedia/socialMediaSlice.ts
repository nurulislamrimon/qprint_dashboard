import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISocialMedia {
  mediaName: string;
  isActive: boolean;
  userName?: string;
  phoneNumber?: string;
}

const initialState: { socialMedias?: ISocialMedia[] } = {};

const socialMediaSlice = createSlice({
  name: "socialMediaSlice",
  initialState,
  reducers: {
    initiateSocialMediaData: (
      state,
      action: PayloadAction<{ socialMedias?: ISocialMedia[] } | null>
    ) => {
      console.log(action.payload);
      if (!action.payload) {
        return;
      }
      return (state = action.payload);
    },
    setSocialMedia: (state, action: PayloadAction<ISocialMedia | null>) => {
      if (!action.payload) {
        return;
      }
      const mediaName = action.payload?.mediaName;
      const restMedias = state?.socialMedias
        ? state.socialMedias?.filter(
            (existMedia) => existMedia.mediaName !== mediaName
          )
        : [];
      state.socialMedias = [...restMedias, action.payload];
    },

    resetSocialMedia: (state) => {
      return initialState;
    },
  },
});

export const { setSocialMedia, resetSocialMedia, initiateSocialMediaData } =
  socialMediaSlice.actions;

export default socialMediaSlice.reducer;
