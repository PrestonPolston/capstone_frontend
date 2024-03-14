import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { decodeBase64Image } from "../../../app/encode_decode";
import {
  useUpdateUserMutation,
  useUpdateUserInformationMutation,
} from "../../../api/metalApi";

const UserInfo = () => {
  const navigate = useNavigate();

  const fetchedUserData = useSelector(
    (state) => state.user?.user || state.user
  );

  const fetchedUserInfo = useSelector(
    (state) => state.userInfo?.userInfo || state.userInfo
  );

  const userPreferences = useSelector(
    (state) => state.userPreferences?.userPreferences || state.userPreferences
  );
  const [updateUser] = useUpdateUserMutation();
  const [updateUserInfo] = useUpdateUserInformationMutation();
  const [editingUserDetails, setEditingUserDetails] = useState({
    username: fetchedUserData.username || "",
    password: fetchedUserData.password || "",
    firstName: fetchedUserData.firstName || "",
    lastName: fetchedUserData.lastName || "",
    email: fetchedUserData.email || "",
    admin: fetchedUserData.admin || "",
  });

  const [editingUserInfo, setEditingUserInfo] = useState({
    address: fetchedUserInfo.address || "",
    state: fetchedUserInfo.state || "",
    city: fetchedUserInfo.city || "",
    postalCode: fetchedUserInfo.postalCode || "",
    country: fetchedUserInfo.country || "",
  });

  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

  const handleDetailsDialogOpen = () => {
    setDetailsDialogOpen(true);
  };

  const handleDetailsDialogClose = () => {
    setDetailsDialogOpen(false);
  };

  const handleInfoDialogOpen = () => {
    setInfoDialogOpen(true);
  };

  const handleInfoDialogClose = () => {
    setInfoDialogOpen(false);
  };

  const handleDetailsEditSubmit = async () => {
    try {
      const response = await updateUser({
        userId: fetchedUserData.id,
        userData: {
          username: fetchedUserData.username,
          password: fetchedUserData.password,
          firstName: editingUserDetails.firstName,
          lastName: editingUserDetails.lastName,
          email: editingUserDetails.email,
          admin: fetchedUserData.admin,
        },
      });

      setDetailsDialogOpen(false);
      handleInfoDialogOpen();
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleInfoEditSubmit = async () => {
    try {
      console.log("Data to be sent for updating:", editingUserInfo);
      const userId = fetchedUserData.id;
      const response = await updateUserInfo({
        userId,
        userInfo: {
          address: editingUserInfo.address,
          state: editingUserInfo.state,
          city: editingUserInfo.city,
          postalCode: editingUserInfo.postalCode,
          country: editingUserInfo.country,
        },
      });
      setInfoDialogOpen(false);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const handleEditDetails = () => {
    handleDetailsDialogOpen();
  };

  const handleEditInfo = () => {
    handleInfoDialogOpen();
  };

  const decodedProfilePic = userPreferences?.profilePic
    ? decodeBase64Image(userPreferences.profilePic)
    : AccountCircle;

  const cardContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  };

  const cardContentStyle = {
    width: "50%",
    textAlign: "center",
    padding: "20px",
  };

  const avatarStyle = {
    width: 150,
    height: 150,
    margin: "0 auto",
    marginBottom: "10px",
  };

  return (
    <div style={cardContainerStyle}>
      <Avatar alt="Profile Picture" src={decodedProfilePic} sx={avatarStyle} />
      <Card sx={cardContentStyle}>
        <Typography variant="h5">User Information</Typography>
        <Typography variant="body1">
          Username: {fetchedUserData.username}
        </Typography>
        <Typography variant="body1">
          Full Name: {fetchedUserData.firstName} {fetchedUserData.lastName}
        </Typography>
        <Typography variant="body1">Email: {fetchedUserData.email}</Typography>
        <Typography variant="body1">
          Address: {fetchedUserInfo.address}
        </Typography>
        <Typography variant="body1">State: {fetchedUserInfo.state}</Typography>
        <Typography variant="body1">City: {fetchedUserInfo.city}</Typography>
        <Typography variant="body1">
          Postal Code: {fetchedUserInfo.postalCode}
        </Typography>
        <Typography variant="body1">
          Country: {fetchedUserInfo.country}
        </Typography>

        <div>
          <IconButton
            onClick={handleEditDetails}
            aria-label="edit user details"
          >
            <EditIcon />
          </IconButton>
          <Button variant="contained" onClick={handleBack}>
            Back
          </Button>
        </div>

        <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose}>
          <DialogContent
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <TextField
              label="First Name"
              value={editingUserDetails.firstName}
              onChange={(e) =>
                setEditingUserDetails({
                  ...editingUserDetails,
                  firstName: e.target.value,
                })
              }
            />
            <TextField
              label="Last Name"
              value={editingUserDetails.lastName}
              onChange={(e) =>
                setEditingUserDetails({
                  ...editingUserDetails,
                  lastName: e.target.value,
                })
              }
            />
            <TextField
              label="Email"
              value={editingUserDetails.email}
              onChange={(e) =>
                setEditingUserDetails({
                  ...editingUserDetails,
                  email: e.target.value,
                })
              }
            />
            <Button variant="contained" onClick={handleDetailsEditSubmit}>
              Submit
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog open={infoDialogOpen} onClose={handleInfoDialogClose}>
          <DialogContent
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <TextField
              label="Address"
              value={editingUserInfo.address}
              onChange={(e) =>
                setEditingUserInfo({
                  ...editingUserInfo,
                  address: e.target.value,
                })
              }
            />
            <TextField
              label="State"
              value={editingUserInfo.state}
              onChange={(e) =>
                setEditingUserInfo({
                  ...editingUserInfo,
                  state: e.target.value,
                })
              }
            />
            <TextField
              label="City"
              value={editingUserInfo.city}
              onChange={(e) =>
                setEditingUserInfo({ ...editingUserInfo, city: e.target.value })
              }
            />
            <TextField
              label="Postal Code"
              value={editingUserInfo.postalCode}
              onChange={(e) =>
                setEditingUserInfo({
                  ...editingUserInfo,
                  postalCode: e.target.value,
                })
              }
            />
            <TextField
              label="Country"
              value={editingUserInfo.country}
              onChange={(e) =>
                setEditingUserInfo({
                  ...editingUserInfo,
                  country: e.target.value,
                })
              }
            />
            <Button variant="contained" onClick={handleInfoEditSubmit}>
              Submit
            </Button>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
};

export default UserInfo;
