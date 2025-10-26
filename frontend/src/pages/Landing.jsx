import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="lb-landing">
      <nav className="lb-nav">
  <div className="lb-logo-text-only">
    
    BlogBuddy
  </div>
  <div className="lb-nav-links">
    <button className="lb-btn lb-btn-primary" onClick={() => navigate("/login")}>
      Login
    </button>
    <button className="lb-btn lb-btn-primary" onClick={() => navigate("/register")}>
      Register
    </button>
  </div>
</nav>

      {/* Hero Section */}
      <header className="lb-hero">
        <h1 className="lb-title">BlogBuddy</h1>
        <p className="lb-sub">
          Your AI-powered blogging companion. Create, generate, and manage posts effortlessly.
        </p>

        {/* Authentication CTA */}
        <div className="lb-cta-auth">
          <button className="lb-btn lb-btn-primary" onClick={() => navigate("/register")}>
            Sign Up
          </button>
          <button className="lb-btn lb-btn-ghost" onClick={() => navigate("/login")}>
            I already have an account
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="lb-features-section">
        <div className="lb-feature-card">
          <h4>AI-Powered Blogs</h4>
          <p>Generate full blog posts in seconds with intelligent AI suggestions.</p>
        </div>
        <div className="lb-feature-card">
          <h4>Create & Edit</h4>
          <p>Write your own content or enhance AI drafts with our editor tools.</p>
        </div>
        <div className="lb-feature-card">
          <h4>Secure & Simple</h4>
          <p>Login with JWT authentication and manage your posts safely.</p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
