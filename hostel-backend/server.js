// server.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const connectDB = require("./config/db");
const hostelRoutes = require("./routes/hostels");

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());


// =====================================================
// DATABASE
// =====================================================

connectDB();


// =====================================================
// TEST API
// =====================================================

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working!"
  });
});


// =====================================================
// HOSTEL ROUTES
// =====================================================

// IMPORTANT:
// All hostel APIs now come from MongoDB
// through routes/hostels.js

app.use("/api/hostels", hostelRoutes);


// =====================================================
// FRONTEND BUILD
// =====================================================

const frontendPath = path.join(
  __dirname,
  "hostel-booking",
  "dist"
);

if (fs.existsSync(frontendPath)) {

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(frontendPath, "index.html")
    );
  });

} else {

  console.warn(
    "⚠️ Frontend build folder not found. Skipping static file serving."
  );
}


// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Backend running on http://localhost:${PORT}`
  );

});