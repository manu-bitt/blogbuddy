import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Register.css"; // Import the new CSS

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await API.post("/api/auth/register", {
        name,
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem("token", res.data.token);

      // Redirect to home
      navigate("/home");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="lb-register">
      <div className="lb-register-card">
        <h2 className="lb-register-title">Welcome Buddy</h2>
        <p className="lb-register-sub">Create your account to get started</p>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="lb-register-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="lb-input"
            required
          />
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
            Register
          </button>
        </form>

        <div className="lb-register-footer">
          Already have an account?{" "}
          <span
            className="lb-register-link"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
