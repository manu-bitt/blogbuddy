import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import CreatePost from "../components/CreatePost";
import AIGenerator from "./AIGenerator.jsx";
import PostList from "../components/PostList";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [mode, setMode] = useState("manual"); // "manual" | "ai"

  // Check login
 useEffect(() => {
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const userId = JSON.parse(atob(token.split(".")[1])).id;

      const res = await API.get(`/blogs/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching user blogs:", err);
      if (err.response && err.response.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };
  fetchPosts();
}, [navigate]);
;

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter((p) => p._id !== id));
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">📚 Saved Blogs</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <PostList
          posts={posts}
          onUpdatePost={handleUpdatePost}
          onDeletePost={handleDeletePost}
        />
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="mode-toggle">
          <button
            className={`toggle-btn ${mode === "manual" ? "active" : ""}`}
            onClick={() => setMode("manual")}
          >
            ✍️ Write Manually
          </button>
          <button
            className={`toggle-btn ${mode === "ai" ? "active" : ""}`}
            onClick={() => setMode("ai")}
          >
            🤖 Create with AI
          </button>
        </div>

        <div className="post-area">
         {mode === "manual" ? (
         <CreatePost onBlogCreated={handleNewPost} />) : (
           <AIGenerator onNewPost={handleNewPost} />
)}

        </div>
      </main>
    </div>
  );
};

export default Home;
