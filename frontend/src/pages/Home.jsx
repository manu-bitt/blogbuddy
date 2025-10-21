import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/api/blogs");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);


  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  
  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
  };

  
  const handleDeletePost = (id) => {
    setPosts(posts.filter((p) => p._id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home - Blog Posts</h1>
      <CreatePost onPostCreated={handleNewPost} />
      <PostList
        posts={posts}
        onUpdatePost={handleUpdatePost}
        onDeletePost={handleDeletePost}
      />
    </div>
  );
};

export default Home;
