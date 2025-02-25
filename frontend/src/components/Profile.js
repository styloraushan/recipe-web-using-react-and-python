import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Guest");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      setIsLoggedIn(true);
      axios
        .get(`http://localhost:5000/auth/user/${userId}`)
        .then((response) => {
          setUsername(response.data.username);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUsername("Guest");
        });
    }
  }, []);

  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = () => navigate("/signup");

  const handleProfileClick = () => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      navigate(`/viewprofile/${userId}`); // ✅ Correct dynamic navigation
    } else {
      navigate("/login"); // Redirects to login if not logged in
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
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
        <button className="btn logout" onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <button className="btn login" onClick={handleLoginClick}>Login</button>
          <button className="btn signup" onClick={handleSignupClick}>Sign Up</button>
        </>
      )}
    </div>
  );
};

export default Profile;