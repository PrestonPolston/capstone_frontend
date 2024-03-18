import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetAllUserInfoQuery } from "../../api/metalApi";

const FetchUserDataPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const {
    data: allUserData,
    isLoading: allDataLoading,
    isError: allDataError,
  } = useGetAllUserInfoQuery(userId);

  if (allDataLoading) {
    return (
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
    );
  }

  if (allDataError) {
    console.error("Error fetching user data:", allDataError);
    return null;
  }

  if (allUserData) {
    const isAdmin = allUserData.userDetails.admin;
    if (isAdmin === true) {
      navigate("/adminLanding");
    } else {
      navigate("/");
    }
  }

  return null;
};

export default FetchUserDataPage;
