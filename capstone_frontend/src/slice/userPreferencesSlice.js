import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  preferences: {
    primaryColor: "",
    secondaryColor: "",
  },
};

const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState,
  reducers: {
    setUserPreferences: (state, action) => {
      state.preferences = action.payload;
    },
    clearUserPreferences: (state) => {
      state.preferences = initialState.preferences;
    },
  },
});

export const { setUserPreferences, clearUserPreferences } =
  userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
