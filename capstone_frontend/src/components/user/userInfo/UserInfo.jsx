import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { decodeBase64Image } from "../../../app/encode_decode";
import { setUser } from "../../../slice/getUserSlice";

const UserInfo = () => {
  const dispatch = useDispatch();
  const fetchedUserData = useSelector((state) => state.user);
  const fetchedUserInfo = useSelector((state) => state.userInfo);
  const userPreferences = useSelector(
    (state) => state.userPreferences.userPreferences
  );

  const decodedProfilePic = userPreferences?.profilePic
    ? decodeBase64Image(userPreferences.profilePic)
    : AccountCircle;

  const navigate = useNavigate();

  const userName = fetchedUserData.username || "N/A";
  const fullName = `${fetchedUserData.firstName || ""} ${
    fetchedUserData.lastName || ""
  }`;
  const email = fetchedUserData.email || "N/A";
  const address = fetchedUserInfo.address || "N/A";
  const state = fetchedUserInfo.state || "N/A";
  const city = fetchedUserInfo.city || "N/A";
  const postalCode = fetchedUserInfo.postalCode || "N/A";
  const country = fetchedUserInfo.country || "N/A";

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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={cardContainerStyle}>
      <Avatar alt="Profile Picture" src={decodedProfilePic} sx={avatarStyle} />
      <Card sx={cardContentStyle}>
        <Typography variant="h5">User Information</Typography>
        <Typography variant="body1">Username: {userName}</Typography>
        <Typography variant="body1">Full Name: {fullName}</Typography>
        <Typography variant="body1">Email: {email}</Typography>
        <Typography variant="body1">Address: {address}</Typography>
        <Typography variant="body1">State: {state}</Typography>
        <Typography variant="body1">City: {city}</Typography>
        <Typography variant="body1">Postal Code: {postalCode}</Typography>
        <Typography variant="body1">Country: {country}</Typography>
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
      </Card>
    </div>
  );
};

export default UserInfo;
