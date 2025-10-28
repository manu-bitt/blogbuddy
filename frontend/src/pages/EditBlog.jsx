import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "./EditBlog.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/api/blogs/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setTags(res.data.tags.join(", "));
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login first.");

      await API.put(
        `/api/blogs/${id}`,
        { title, content, tags: tags.split(",").map((t) => t.trim()) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Blog updated successfully!");
      navigate("/home"); 
    } catch (err) {
      console.error(err);
      alert("Failed to update blog.");
    }
  };

  return (
    <div className="notes-card">
      <h2 className="notes-title">✏️ Edit Blog</h2>
      <form onSubmit={handleUpdate} className="notes-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="notes-input"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="notes-textarea"
          required
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="notes-input"
          placeholder="Tags (comma separated)"
        />
        <button type="submit" className="notes-btn">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
