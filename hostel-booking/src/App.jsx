// src/App.jsx
import React from 'react';
import AdminRoute from "./components/AdminRoute";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import AllHostelsPage from './pages/AllHostelsPage'; // 👈 Import the new page
import HostelDetailPage from './components/HostelDetailPage';
import HostelUploadForm from './components/HostelUploadForm';
import Footer from './components/Footer';
import Login from './pages/Login';
import Profile from './pages/Profile';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/all-hostels" element={<AllHostelsPage />} /> {/* 👈 New route */}
        <Route path="/hostel/:id" element={<HostelDetailPage />} />
        <Route 
        path="/upload-hostel" 
        element={
        <AdminRoute>
          <HostelUploadForm />
        </AdminRoute>
        } />
        {/* Add more routes here if needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
