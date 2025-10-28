import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./PostList.css";

const pastelColors = ["#FFFA87", "#FFB3BA", "#BAFFC9", "#BAE1FF", "#FFDBAC"];

const PostList = ({ posts, onDeletePost }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation(); 
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first.");
    try {
      await API.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDeletePost(id);
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post.");
    }
  };

  if (!posts || posts.length === 0)
    return <p className="no-posts">No posts available.</p>;

  return (
    <div className="postlist-container">
      {posts.map((post) => {
        const bgColor =
          pastelColors[Math.floor(Math.random() * pastelColors.length)];

        return (
          <div
            key={post._id}
            className="post-note"
            style={{ backgroundColor: bgColor, cursor: "pointer" }}
            onClick={() => handleClick(post._id)}
          >
            <div className="note-header">
              <h3 className="note-title">{post.title}</h3>
              <button
                className="note-delete-btn"
                onClick={(e) => handleDelete(e, post._id)}
              >
                🗑️
              </button>
            </div>
            <p className="note-snippet">
              {post.content.length > 50
                ? post.content.substring(0, 50) + "..."
                : post.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
