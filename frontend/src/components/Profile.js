import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Make sure to install axios
import "./Profile.css";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Guest");
  const navigate = useNavigate();

  // Fetch user details on component mount
  useEffect(() => {
    const userId = localStorage.getItem("user_id"); // Assuming user_id is stored in localStorage
    if (userId) {
      setIsLoggedIn(true);
      // Fetch user details from backend using the user_id
      axios
        .get(`http://localhost:5000/auth/user/${userId}`)
        .then((response) => {
          setUsername(response.data.username);  // Assuming the API returns a 'username' field
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUsername("Guest");
        });
    }
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/viewprofile");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id"); // Clear user_id from localStorage on logout
    setIsLoggedIn(false);
    setUsername("Guest");
    navigate("/login");
  };

  return (
    <div className="profile-card">
      <img
        src="https://static.vecteezy.com/system/resources/previews/028/794/707/non_2x/cartoon-cute-school-boy-photo.jpg"
        alt="Profile"
        className="profile-image"
      />
      <h3 className="username">{username}</h3>

      <button className="btn" onClick={handleProfileClick}>View Profile</button>

      {isLoggedIn ? (
        <button className="btn logout" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <>
          <button className="btn login" onClick={handleLoginClick}>
            Login
          </button>
          <button className="btn signup" onClick={handleSignupClick}>
            Sign Up
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
