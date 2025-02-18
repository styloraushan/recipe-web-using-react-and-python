import React from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    // Get user details from localStorage
    const userId = localStorage.getItem("user_id");
    const username = localStorage.getItem("username"); 

    return (
        <div>
            <Navbar />
            <div>
                <h2>Welcome to the Dashboard</h2>
                {username && <p>Welcome, {username}!</p>} 
                <p>User ID: {username}</p>
                <button onClick={() => {
                    localStorage.removeItem("user_id"); 
                    localStorage.removeItem("username"); 
                    window.location.href = "/login"; 
                }}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
