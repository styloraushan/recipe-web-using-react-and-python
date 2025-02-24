import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/Login.css";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const UpdateUser = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(false); // To handle loading state
    const navigate = useNavigate();
    const { user_id } = useParams(); // Ensure it matches the route param

    // Fetch user details when component mounts
    useEffect(() => {
        console.log("Fetching user for ID:", user_id);
        axios.get(`http://localhost:5000/auth/user/${user_id}`)
            .then((res) => {
                console.log("Fetched user data:", res.data);
                setForm((prevForm) => ({
                    ...prevForm,
                    username: res.data.username || "",
                    email: res.data.email || "",
                }));
            })
            .catch((err) => console.error("Error fetching user:", err.response?.data || err));
    }, [user_id]);

    // Handle form input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Submitting update:", form);

        try {
            const res = await axios.put(`http://localhost:5000/auth/user/${user_id}`, form);
            alert(res.data.message || "User updated successfully");
            navigate("/"); // Redirect after update
        } catch (err) {
            console.error("Update error:", err.response?.data || err);
            alert(err.response?.data?.error || "Error updating user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="login-container">
                <h2>Update User</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password (leave blank to keep current password)"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <button type="submit" className="input-btn" disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </button>
                </form>
                <p className="back-link" onClick={() => navigate("/profile")}>⬅ Back to Profile</p>
            </div>
        </div>
    );
};

export default UpdateUser;
