import { useSelector } from "react-redux";
import getUserSlice from "../slice/getUserSlice";

const AccountInfo = () => {
  const userData = useSelector((state) => state.getUser.userData);

  return (
    <div>
      {userData && (
        <div>
          <h2>User Information</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
