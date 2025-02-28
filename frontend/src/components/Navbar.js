
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaSearch, FaBars, FaUser } from "react-icons/fa";
// import Profile from "./Profile"; // Import Profile component
// import "./Navbar.css";

// const Navbar = ({ className }) => {
//   const [sidebarActive, setSidebarActive] = useState(false);
//   const [showProfile, setShowProfile] = useState(false); // State for profile card

//   const toggleSidebar = () => {
//     setSidebarActive(!sidebarActive);
//   };

//   const toggleProfile = () => {
//     setShowProfile(!showProfile); // Toggle profile card visibility
//   };

//   return (
//     <nav className={`navbar ${className || ""}`}>
//       {/* Left: App Icon */}
//       <div className="navbar-left">
//         <h2 className="logo">🍽️ Recipe Navigator</h2>
//       </div>

//       {/* Right: Menu Links + Icons */}
//       <div className="navbar-right">
//         <ul className="nav-links">
//           <li><Link to="/">Recipes</Link></li>
//           <li><Link to="/ingredients">Ingredients</Link></li>
//           <li><Link to="/recipegrid">Hot Picks</Link></li>
//           <li><Link to="/protips">Pro Tips</Link></li>
//         </ul>

//         {/* Icons */}
//         <div className="icons">
//           <Link to="/searchbar">
//             <FaSearch className="icon search-icon" />
//           </Link>

//           <Link to="/menu">
//             <FaBars className="icon menu-icon" onClick={toggleSidebar} />
//           </Link>

//           {/* Profile Icon (Click to Show Profile Card) */}
//           <FaUser className="icon profile-icon" onClick={toggleProfile} />
//         </div>
//       </div>

//       {/* Profile Card (Only Show When Clicked) */}
//       {showProfile && <Profile />}
//     </nav>
//   );
// };

// export default Navbar;




import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaTimes, FaUser, FaEye } from "react-icons/fa";
import Profile from "./Profile"; // Import Profile component
import "./Navbar.css";

const Navbar = ({ className }) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // State to check screen size

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <nav className={`navbar ${className || ""}`}>
      {/* Left: App Icon */}
      <div className="navbar-left">
        <h2 className="logo">🍽 Recipe Navigator</h2>
      </div>

      {/* Right: Menu Links + Icons */}
      <div className="navbar-right">
        {/* Desktop Links (Hidden on small screens) */}
        <ul className={`nav-links ${isMobile ? "hidden" : ""}`}>
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
            <FaEye className="icon search-icon" />
          </Link>

          {/* Show Menu Icon only on small screens */}
          {isMobile && (
            sidebarActive ? (
              <FaTimes className="icon close-icon" onClick={toggleSidebar} />
            ) : (
              <FaBars className="icon menu-icon" onClick={toggleSidebar} />
            )
          )}

          {/* Profile Icon */}
          <FaUser className="icon profile-icon" onClick={toggleProfile} />
        </div>
      </div>

      {/* Sidebar (Mobile View) */}
      <div className={`sidebar ${sidebarActive ? "active" : ""}`}>
        <ul className="sidebar-links">
          <li><Link to="/" onClick={toggleSidebar}>Recipes</Link></li>
          <li><Link to="/ingredients" onClick={toggleSidebar}>Ingredients</Link></li>
          <li><Link to="/recipegrid" onClick={toggleSidebar}>Hot Picks</Link></li>
          <li><Link to="/protips" onClick={toggleSidebar}>Pro Tips</Link></li>
        </ul>
      </div>

      {/* Profile Card */}
      {showProfile && <Profile />}
    </nav>
  );
};

export default Navbar;
