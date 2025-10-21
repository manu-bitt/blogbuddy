import React, { useState } from "react";
import API from "../api";

const PostList = ({ posts, onUpdatePost, onDeletePost }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const startEditing = (post) => {
    setEditingId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const saveEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must login first");
        return;
      }

      const res = await API.put(
        `/api/blogs/${id}`,
        { title: editTitle, content: editContent },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdatePost(res.data); // Call the parent function to update state
      cancelEditing();
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  const deletePost = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must login first");
      return;
    }

    try {
      await API.delete(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDeletePost(id); // Call parent function to remove post from state
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  if (!posts || posts.length === 0) return <p>No posts available.</p>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="border p-4 rounded">
          {editingId === post._id ? (
            <div>
              <input
                className="border p-2 w-full mb-2"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="border p-2 w-full mb-2"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                onClick={() => saveEdit(post._id)}
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-white px-3 py-1 rounded"
                onClick={cancelEditing}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.content}</p>
              <div className="mt-2 space-x-2">
                <button
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                  onClick={() => startEditing(post)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => deletePost(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
