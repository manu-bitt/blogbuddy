import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import blogRoutes from '../routes/blogRoutes.js'
import authRoutes from "../routes/authRoutes.js";
import aiRoutes from '../routes/aiRoutes.js'
dotenv.config()
const app = express()

app.use(express.json())

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://127.0.0.1:5173", 
    "http://localhost:5174", 
    "http://127.0.0.1:5174",
    "https://blogbuddy-lake.vercel.app",
    "https://blogbuddy-lake.vercel.app/"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use("/api/auth",authRoutes);

app.use("/api/blogs", blogRoutes);

app.use('/api/ai',aiRoutes);


app.get('/',(req,res)=>{
    res.send('blogbuddy is running')
})

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
