# 📝 BlogBuddy — AI-Powered Blogging Platform

**BlogBuddy** is a full-stack MERN application that lets users create, edit, and manage blogs manually ✍️ or generate them using AI 🤖.  
It includes authentication, CRUD features, and real-time content creation via AI.  

---

## 🚀 Features

### 👤 User Authentication
- Secure JWT-based login & signup  
- Protected routes for authenticated users  

### 🧠 AI Blog Generator
- Generate blog posts automatically using OpenAI API  
- Choose tone (Informative, Casual, Professional, Funny)  
- Save AI-generated blogs instantly  

### ✍️ Manual Blog Creation
- Write blogs manually with title and content  
- Edit and delete posts anytime  

### 🗂️ Dashboard & Sidebar
- Sidebar lists all saved blogs  
- Click any blog to view/edit/delete  
- Logout anytime securely  

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js (Vite), Axios, React Router |
| **Styling** | CSS (custom, no Tailwind) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **AI Integration** | OpenAI API |
| **Hosting** | Frontend → Vercel, Backend → Render |

---

## 📁 Project Structure

```
blogbuddy/
│
├── backend/
│   ├── src/
│   │   ├── app.js         # Express app entry
│   │   ├── routes/        # API routes (auth, blogs, AI)
│   │   ├── models/        # Mongoose models
│   │   └── controllers/   # Route logic
│   └── .env               # Environment variables (OpenAI key, Mongo URI, JWT secret)
│
├── frontend/
│   ├── src/
│   │   ├── pages/         # Home, Login, Register, AIGenerator
│   │   ├── components/    # CreatePost, PostList, etc.
│   │   ├── api.js         # Axios instance
│   │   └── App.jsx
│   ├── public/
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup (Local)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/manu-bitt/blogbuddy.git
cd blogbuddy
```

### 2️⃣ Backend setup
```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:
```env
PORT=4000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

Start backend:
```bash
npm start
```

### 3️⃣ Frontend setup
```bash
cd ../frontend
npm install
```

Create a `.env` file inside `/frontend`:
```env
VITE_API_URL=http://localhost:4000
```

Start frontend:
```bash
npm run dev
```

Then open 👉 **http://localhost:5173**

---

## 🌐 Deployment

### Backend (Render)
- Connected `backend/` folder to Render.
- Added environment variables from `.env`.
- Auto-deployed on commit.

### Frontend (Vercel)
- Root Directory → `frontend`
- Build Command → `npm run build`
- Output Directory → `dist`
- Environment Variable →  
  `VITE_API_URL=https://your-backend.onrender.com`

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/blogs/user/:id` | Get blogs by user |
| POST | `/api/blogs` | Create a new blog |
| PUT | `/api/blogs/:id` | Update blog |
| DELETE | `/api/blogs/:id` | Delete blog |
| POST | `/api/ai/generate` | Generate AI blog using OpenAI |

---

## 💡 Lessons Learned
- How to structure a full MERN project  
- Handling JWT authentication  
- Integrating OpenAI API for custom AI features  
- Deploying backend (Render) + frontend (Vercel)  
- Managing environment variables securely  

---

## 👨‍💻 Author
**Manu Pal**  
📍 Delhi, India  
🎓 Student at Newton School of Technology  
💬 Passionate about Web Development, AI, and Startups  

🔗 [GitHub](https://github.com/manu-bitt) • [LinkedIn](https://linkedin.com)

---

## 🛡️ License
This project is licensed under the **MIT License** — feel free to use and modify.

---

### ⭐ If you like this project, give it a star on GitHub!
