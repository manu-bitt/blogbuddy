
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AIGenerator from "./pages/AIGenerator"
import EditBlog from "./pages/EditBlog";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ai" element={<AIGenerator />} /> 
        
      </Routes>
    </Router>
  );
}

export default App;

