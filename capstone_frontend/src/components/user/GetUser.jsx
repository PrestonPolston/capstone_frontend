import React from "react";
import { useGetUsersQuery } from "../../api/metalApi";

const GetAllUsers = () => {
  const { data, error, isLoading } = useGetUsersQuery();

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          {data.map((user) => (
            <div key={user.id}>
              <p>Username: {user.username}</p>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Email: {user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllUsers;
