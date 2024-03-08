import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetAllUserInfoQuery } from "../api/metalApi";
import { setUser } from "../slice/getUserSlice";
import { setUserInfo } from "../slice/getUserInfo";
import { setUserPreferences } from "../slice/userPreferencesSlice";

const FetchUserDataPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const { data, isLoading, isError } = useGetAllUserInfoQuery(userId);

  useEffect(() => {
    if (data) {
      const { preferences, userDetails, userInformation, wishlists } = data;

      dispatch(setUser(userDetails));
      dispatch(setUserInfo(userInformation));
      dispatch(setUserPreferences(preferences));

      navigate("/");
    } else {
      navigate("/login");
    }
  }, [data, dispatch, navigate]);

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  ) : null;
};

export default FetchUserDataPage;
