import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Login.css"; // New CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");
      setTimeout(() => navigate("/home"), 100);
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="lb-login">
      <div className="lb-login-card">
        <h2 className="lb-login-title">Welcome Back</h2>
        <p className="lb-login-sub">Login to access your AI-powered blogs</p>
        <form onSubmit={handleSubmit} className="lb-login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="lb-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="lb-input"
            required
          />
          <button type="submit" className="lb-btn-primary">
            Login
          </button>
        </form>
        <p className="lb-login-footer">
          Don’t have an account?{" "}
          <span className="lb-login-link" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
