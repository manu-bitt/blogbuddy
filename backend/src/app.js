import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import blogRoutes from '../routes/blogRoutes.js'
import authRoutes from "../routes/authRoutes.js";
dotenv.config()
const app = express()

app.use(cors())

app.use(express.json())


app.use("/api/auth",authRoutes);

app.use("/api/blogs", blogRoutes);


app.get('/',(req,res)=>{
    res.send('blogbuddy is running')
})

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
