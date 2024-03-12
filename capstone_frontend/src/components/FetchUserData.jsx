import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useGetAllUserInfoQuery,
  useGetReviewByUserQuery,
  useGetUserOrdersQuery,
} from "../api/metalApi";
import { setUser } from "../slice/getUserSlice";
import { setUserReview } from "../slice/userReviews";
import { setUserInfo } from "../slice/getUserInfo";
import { setUserPreferences } from "../slice/userPreferencesSlice";
import { setUserOrders } from "../slice/userOrdersSlice";

const FetchUserDataPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const { data, isLoading, isError } = useGetAllUserInfoQuery(userId);
  const reviewData = useGetReviewByUserQuery(userId);
  const userOrders = useGetUserOrdersQuery(userId);
  useEffect(() => {
    if (data && reviewData.data) {
      const { preferences, userDetails, userInformation, wishlists } = data;
      dispatch(setUserReview(reviewData.data));
      dispatch(setUser(userDetails));
      dispatch(setUserInfo(userInformation));
      dispatch(setUserPreferences(preferences));
      dispatch(setUserOrders(userOrders.data));

      navigate("/");
    } else {
      navigate("/login");
    }
  }, [data, reviewData.data, dispatch, navigate]);

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
