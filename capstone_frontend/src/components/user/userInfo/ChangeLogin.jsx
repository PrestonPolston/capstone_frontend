import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUpdateUserMutation, useGetUserQuery } from "../../../api/metalApi";

const UpdateUser = () => {
  const userLoginInfo = useSelector((state) => state.user);
  const [updateUser] = useUpdateUserMutation();
  const userId = userLoginInfo.id;
  const initialUserData = {
    username: userLoginInfo.username || "",
    password: "",
    confirmPassword: "",
    firstName: userLoginInfo.firstName || "",
    lastName: userLoginInfo.lastName || "",
    email: userLoginInfo.email || "",
    admin: userLoginInfo.admin || false,
    userPreferencesId: userLoginInfo.userPreferencesId || -1,
  };

  const [userData, setUserData] = useState(initialUserData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      console.log(
        "Passwords do not match. Please re-enter matching passwords."
      );
      return;
    }
    if (userLoginInfo.id === undefined) {
    }

    const updatedData = { ...userData };
    delete updatedData.confirmPassword;

    try {
      console.log(updatedData);
      const response = await updateUser({
        userId: userId,
        userData: updatedData,
      });
      console.log("User data updated successfully:", response);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ width: "50%", textAlign: "center", padding: "20px" }}>
        <CardContent>
          <Typography variant="h5">Change Username or Password</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              Save Changes
            </Button>
          </form>

          <div style={{ marginTop: "10px" }}>
            <Button
              onClick={handleBack}
              variant="contained"
              color="secondary"
              size="small"
              style={{ marginRight: "10px" }}
            >
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateUser;
