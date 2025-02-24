import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/Login.css";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();
    const { user_id } = useParams(); // Get user_id from URL

    // 🔄 Fetch user data on mount
    useEffect(() => {
        axios.get(`http://localhost:5000/auth/user/${user_id}`)
            .then((res) => setForm(res.data))
            .catch((err) => console.error("Error fetching user:", err));
    }, [user_id]);

    // ✏️ Handle input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 💾 Handle form submission for update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/auth/user/${user_id}`, form);
            alert(res.data.message || "User updated successfully");
            navigate("/profile"); // Redirect after update
        } catch (err) {
            alert(err.response?.data?.error || "Error updating user");
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
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <button type="submit" className="input-btn">Update</button>
                </form>
                <p className="back-link" onClick={() => navigate("/profile")}>⬅ Back to Profile</p>
            </div>
        </div>
    );
};

export default UpdateUser;
