import React, { useEffect } from "react";
import { useGetUserQuery } from "../api/metalApi";

const AccountInfo = () => {
  const userId = localStorage.getItem("userId");
  const { data: fetchedUserData, isLoading, isError } = useGetUserQuery(userId);

  if (isLoading) return <p>Loading user data...</p>;
  if (isError) return <p>Error fetching user data</p>;
  if (!fetchedUserData) return null;

  const fullName = `${fetchedUserData.firstName} ${fetchedUserData.lastName}`;

  return (
    <div>
      <h2>User Information</h2>
      <p>Name: {fullName}</p>
      <p>Email: {fetchedUserData.email}</p>
    </div>
  );
};

export default AccountInfo;
