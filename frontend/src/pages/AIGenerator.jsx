import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./AIGenerator.css";

const AIGenerator = ({ onNewPost }) => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("informative");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  
  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return alert("Please enter a topic.");

    setLoading(true);
    setContent("");
    try {
      const res = await API.post("/ai/generate", {
        topic,
        tone,
        maxTokens: 700,
      });
      setContent(res.data.content || "AI returned empty content.");
    } catch (err) {
      console.error("AI generation error:", err);
      alert(err.response?.data?.message || "Failed to generate blog. Try again.");
    } finally {
      setLoading(false);
    }
  };

 
  const handleSave = async () => {
    if (!content.trim()) return alert("No content to save.");
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login before saving.");

    try {
      const res = await API.post(
        "/api/blogs",
        { title: topic.trim(), content, tags: [] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Saved successfully!");
      setTopic("");
      setContent("");

      
      if (onNewPost) onNewPost(res.data);
    } catch (err) {
      console.error("Save failed:", err);
      alert(err.response?.data?.message || "Failed to save blog.");
    }
  };

  return (
    <div className="ai-notes-card">
      <h1 className="ai-notes-title">AI Blog Generator</h1>

      <form onSubmit={handleGenerate} className="ai-notes-form">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter blog topic, e.g. 'AI in Healthcare'"
          className="ai-notes-input"
          required
        />
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="ai-notes-select"
        >
          <option value="informative">Informative</option>
          <option value="casual">Casual</option>
          <option value="professional">Professional</option>
          <option value="funny">Funny</option>
        </select>
        <button type="submit" disabled={loading} className="ai-notes-btn">
          {loading ? "Generating..." : "Generate Blog"}
        </button>
      </form>

      {content && (
        <div className="generated-blog">
          <h2 className="ai-notes-title" style={{ fontSize: "28px" }}>Generated Blog</h2>
          <div className="ai-notes-content">{content}</div>
          <button onClick={handleSave} className="ai-notes-save-btn">
            Save as Blog
          </button>
        </div>
      )}
    </div>
  );
};

export default AIGenerator;
