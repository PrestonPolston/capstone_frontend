import { createSlice } from "@reduxjs/toolkit";
import { metalApi } from "../../api/metalApi";
import manageUserPreferencesStorage from "../../app/sessionStorage/userPreferencesStorage";

const initialUserPreferences =
  manageUserPreferencesStorage.retrieveFromSessionStorage("userPreferences");

const getUserPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState: initialUserPreferences,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        metalApi.endpoints.getAllUserInfo.matchFulfilled,
        (state, action) => {
          state.userPreferences = action.payload.preferences;
          manageUserPreferencesStorage.saveToSessionStorage(
            "userPreferences",
            state.userPreferences
          );
        }
      )
      .addMatcher(
        metalApi.endpoints.updateUserPreferences.matchFulfilled,
        (state, action) => {
          console.log("Response from updateUserPreferences:", action.payload);
          state.userPreferences = action.payload;
          manageUserPreferencesStorage.saveToSessionStorage(
            "userPreferences",
            state.userPreferences
          );
        }
      );
  },
});

export default getUserPreferencesSlice.reducer;
