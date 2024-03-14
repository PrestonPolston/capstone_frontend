import { createSlice } from "@reduxjs/toolkit";
import { metalApi } from "../../api/metalApi";
import manageUserInfoStorage from "../../app/sessionStorage/userInfoStorage";

const initialUserInfo =
  manageUserInfoStorage.retrieveFromSessionStorage("userInfo");

const getUserInfoSlice = createSlice({
  name: "userInfo",
  initialState: initialUserInfo,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        metalApi.endpoints.getAllUserInfo.matchFulfilled,
        (state, action) => {
          state.userInfo = action.payload.userInformation;
          manageUserInfoStorage.saveToSessionStorage(
            "userInfo",
            action.payload.userInformation
          );
        }
      )
      .addMatcher(
        metalApi.endpoints.updateUserInformation.matchFulfilled,
        (state, action) => {
          state.userInfo = action.payload;
          manageUserInfoStorage.saveToSessionStorage(
            "userInfo",
            action.payload
          );
        }
      );
  },
});

export const { setUserInfo } = getUserInfoSlice.actions;

export default getUserInfoSlice.reducer;
