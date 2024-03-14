import { createSlice } from "@reduxjs/toolkit";
import { metalApi } from "../../api/metalApi";
import manageUserStorage from "../../app/sessionStorage/userStorage";

const initialUser = manageUserStorage.retrieveFromSessionStorage("user");

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        metalApi.endpoints.getAllUserInfo.matchFulfilled,
        (state, action) => {
          state.user = action.payload.userDetails;
          manageUserStorage.saveToSessionStorage("user", state.user);
        }
      )
      .addMatcher(
        metalApi.endpoints.updateUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
          manageUserStorage.saveToSessionStorage("user", state.user);
        }
      );
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
