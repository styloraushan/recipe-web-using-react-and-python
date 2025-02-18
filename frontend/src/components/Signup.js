import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/auth/signup", form);
            alert(res.data.message); 
            navigate("/login"); 
        } catch (err) {
            alert(err.response.data.error); 
        }
    };

    return (
        <div>
            <Navbar />
            <div className="login-container">
                <h2>Signup</h2>
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
                        required
                    />
                    <button type="submit" className="input-btn">Sign Up</button>
                </form>

                <div className="social-login">
                    <button className="google-btn">
                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
                        Google
                    </button>
                    <button className="facebook-btn">
                        <img src="https://img.icons8.com/fluency/48/000000/facebook-new.png" alt="Facebook" />
                        Facebook
                    </button>
                </div>

                <p className="register-link">
                    Already have an account? <span onClick={() => navigate("/login")}>Login</span>
                </p>
             
            </div>
        </div>
    );
};

export default Signup;
