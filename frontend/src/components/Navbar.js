import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaUser } from "react-icons/fa";
import Profile from "./Profile"; // Import Profile component
import "./Navbar.css";


const Navbar = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [showProfile, setShowProfile] = useState(false); // State for profile card

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile); // Toggle profile card visibility
  };

  return (
    <nav className="navbar">
      {/* Left: App Icon */}
      <div className="navbar-left">
        <h2 className="logo">🍽️ Recipe Finder</h2>
      </div>

      {/* Right: Menu Links + Icons */}
      <div className="navbar-right">
        <ul className="nav-links">
          <li><Link to="/">Recipes</Link></li>
          <li><Link to="/ingredients">Ingredients</Link></li>
          <li><Link to="/recipegrid">Hot Picks</Link></li>
          <li><Link to="/protips">Pro Tips</Link></li>
        </ul>

        {/* Icons */}
        <div className="icons">
          <Link to="/searchbar">
            <FaSearch className="icon search-icon" />
          </Link>

          <Link to="/menu">
            <FaBars className="icon menu-icon" onClick={toggleSidebar} />
          </Link>

          {/* Profile Icon (Click to Show Profile Card) */}
          <FaUser className="icon profile-icon" onClick={toggleProfile} />
        </div>
      </div>

      {/* Profile Card (Only Show When Clicked) */}
      {showProfile && <Profile />}
    </nav>
  );
};

export default Navbar;
