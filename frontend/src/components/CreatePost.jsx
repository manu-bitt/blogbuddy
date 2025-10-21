import React, { useState } from "react";
import API from "../api";
import {jwtDecode} from "jwt-decode";

const CreatePost = ({ onPostCreated }) => {
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

      onPostCreated(res.data);
      setTitle("");
      setContent("");
      setTags("");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
