import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // store username or later, userId from auth
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
