import { useGetUserQuery } from "../../../api/metalApi";
import { useGetUserPreferencesQuery } from "../../../api/metalApi";
import { Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountInfo = () => {
  const userData = useSelector((state) => state.user);

  const {
    data: fetchedUserPreferences,
    isLoading: loadingUserPreferences,
    isError: errorUserPreferences,
  } = useGetUserPreferencesQuery(userData.id);

  const cardContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    flexWrap: "wrap",
  };

  const cardStyle = {
    flex: "0 0 33.33%", // Set each card to occupy 33.33% of the container width
    cursor: "pointer",
    overflow: "hidden",
    minWidth: 150,
    maxWidth: "33.33%", // Limit maximum width for responsiveness
    margin: 0, // Remove margins
  };

  const cardContentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Link to="/userInfo" style={{ textDecoration: "none" }}>
            <Card>
              <CardContent>
                <h2>User Information</h2>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link to="/updateLogin" style={{ textDecoration: "none" }}>
            <Card>
              <CardContent>
                <h2>Change Password</h2>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link to="/userpreferences" style={{ textDecoration: "none" }}>
            <Card>
              <CardContent>
                <h2>User Preferences</h2>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link to="/blank" style={{ textDecoration: "none" }}>
            <Card>
              <CardContent>
                <h2>Reviews</h2>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link to="/blank" style={{ textDecoration: "none" }}>
            <Card>
              <CardContent>
                <h2>Orders</h2>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link to="/blank" style={{ textDecoration: "none" }}>
            <Card>
              <CardContent>
                <h2>Wish List</h2>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default AccountInfo;
