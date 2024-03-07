import { createSlice } from "@reduxjs/toolkit";
import { metalApi } from "../api/metalApi";

const getUserPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState: {
    userPreferences: {},
  },
  reducers: {
    setUserPreferences: (state, action) => {
      state.userPreferences = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      metalApi.endpoints.getUserPreferences.matchFulfilled,
      (state, action) => {
        state.userPreferences = action.payload;
      }
    );
  },
});

export const { setUserPreferences } = getUserPreferencesSlice.actions;

export default getUserPreferencesSlice.reducer;
