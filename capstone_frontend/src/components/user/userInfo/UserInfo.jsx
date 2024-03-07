import { useGetUserInformationQuery } from "../../../api/metalApi";
import { useGetUserQuery } from "../../../api/metalApi";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { decodeBase64Image } from "../../../app/encode_decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slice/getUserSlice";

const UserInfo = () => {
  const dispatch = useDispatch();
  const userPreferences = useSelector(
    (state) => state.userPreferences.preferences
  );
  const profilePic = userPreferences?.profilePic;
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const {
    data: fetchedUserData,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserQuery(userId);
  dispatch(setUser(fetchedUserData));
  const {
    data: fetchedUserInfo,
    isLoading: infoLoading,
    isError: infoError,
  } = useGetUserInformationQuery(userId);

  if (userLoading || infoLoading) return <p>Loading user information...</p>;
  if (userError || infoError) return <p>Error fetching user information</p>;

  const userName = fetchedUserData?.username || "N/A";
  const fullName = `${fetchedUserData?.firstName || ""} ${
    fetchedUserData?.lastName || ""
  }`;
  const email = fetchedUserData?.email || "N/A";
  const address = fetchedUserInfo?.address || "N/A";
  const state = fetchedUserInfo?.state || "N/A";
  const city = fetchedUserInfo?.city || "N/A";
  const postalCode = fetchedUserInfo?.postalCode || "N/A";
  const country = fetchedUserInfo?.country || "N/A";

  const decodedProfilePic = profilePic
    ? decodeBase64Image(profilePic)
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
    marginBottom: "10px", // Adjust the margin bottom for spacing
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
