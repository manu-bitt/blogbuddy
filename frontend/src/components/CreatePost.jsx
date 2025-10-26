import React, { useState } from "react";
import API from "../api";
import { jwtDecode } from "jwt-decode";
import "./CreatePost.css";

const CreateBlog = ({ onBlogCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first.");
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const res = await API.post(
        "/api/blogs",
        { title, content, userId, tags: tags.split(",").map((t) => t.trim()) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onBlogCreated(res.data);
      setTitle("");
      setContent("");
      setTags("");
    } catch (err) {
      console.error("Error creating blog:", err);
    }
  };

  return (
    <div className="notes-card">
      <h2 className="notes-title">📝 Create a Blog</h2>
      <form onSubmit={handleSubmit} className="notes-form">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="notes-input"
          required
        />
        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="notes-textarea"
          rows={8}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="notes-input"
        />
        <button type="submit" className="notes-btn">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
