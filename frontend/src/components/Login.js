import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import "./Login.css";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/auth/login", form);

            // Show success toast notification
            toast.success(res.data.message, { position: "top-right" });

            // Store user ID in local storage
            localStorage.setItem("user_id", res.data.user_id);

            // Redirect to Dashboard after a short delay
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (err) {
            // Show error toast notification
            const errorMsg = err.response?.data?.error || "Something went wrong!";
            toast.error(errorMsg, { position: "top-right" });
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:5000/auth/google"; // Backend Google auth route
    };

    const handleFacebookLogin = () => {
        window.location.href = "http://localhost:5000/auth/facebook"; // Backend Facebook auth route
    };

    return (
        <div>
            <Navbar />
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={form.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        className="input-form"
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={form.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <button type="submit" className="input-btn">Login</button>
                </form>

                <div className="social-login">
                    <button className="google-btn" onClick={handleGoogleLogin}>
                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
                        Google
                    </button>
                    <button className="facebook-btn" onClick={handleFacebookLogin}>
                        <img src="https://img.icons8.com/fluency/48/000000/facebook-new.png" alt="Facebook" />
                        Facebook
                    </button>
                </div>

                <p className="register-link">
                    Don't have an account? <span onClick={() => navigate("/signup")}>Register here</span>
                </p>

                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;
