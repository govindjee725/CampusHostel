// server.js (Express backend)
const express = require("express");
const cors = require("cors");

const hostelRoutes = require('./routes/hostels'); // Route file (check inside for route syntax)
const hostels = require('./allhostel/addhostel'); // Sample data
const path = require('path');

const app = express();
const _dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json());




// Routes
app.get('/api/test', (req, res) => {
  res.json({ message: "API is working!" });
});

// Sample hardcoded hostel data (optional — remove if you switch to DB-only)
app.get("/api/hostels", (req, res) => res.json(hostels));

app.get("/api/hostels/:id", (req, res) => {
  const hostel = hostels.find(h => h.id == req.params.id);
  if (hostel) res.json(hostel);
  else res.status(404).json({ error: "Hostel not found" });
});

app.post("/api/hostels/search", (req, res) => {
  const { location } = req.body;
  const results = hostels.filter(h =>
    h.location.toLowerCase().includes(location.toLowerCase())
  );
  res.json(results);
});

// Modular routes
app.use('/api/hostels', hostelRoutes);

// Serve frontend (React build)
const frontendPath = path.join(_dirname, 'hostel-booking/dist');
const fs = require('fs');

if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  console.warn('⚠️  Frontend build folder not found. Skipping static file serving.');
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
