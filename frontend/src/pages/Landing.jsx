import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to BlogBuddy</h1>
      <p className="mb-6">Please login or register to continue.</p>
      <div className="space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Landing;
