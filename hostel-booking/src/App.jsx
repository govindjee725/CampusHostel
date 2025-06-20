// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import AllHostelsPage from './pages/AllHostelsPage'; // 👈 Import the new page
import HostelDetailPage from './components/HostelDetailPage';
import HostelUploadForm from './components/HostelUploadForm';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-hostels" element={<AllHostelsPage />} /> {/* 👈 New route */}
        <Route path="/hostel/:id" element={<HostelDetailPage />} />
        <Route path="/upload-hostel" element={<HostelUploadForm />} />
        {/* Add more routes here if needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
