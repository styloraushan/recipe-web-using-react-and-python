import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axios
        .get(`http://localhost:5000/auth/user/${userId}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      {/* Display other user data here */}
    </div>
  );
};

export default ViewProfile;
