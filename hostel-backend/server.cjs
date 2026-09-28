// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");

// const connectDB = require("./config/db");
// const hostelRoutes = require("./routes/hostels");
// const { hostels, addHostel } = require("./allhostel/addhostel");

// const app = express();

// // Connect MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Test route
// app.get("/api/test", (req, res) => {
//   res.json({ message: "API is working!" });
// });
// // ADD HOSTEL (from form)
// app.post("/api/hostels", (req, res) => {
//   try {
//     const newHostel = addHostel(req.body);
//     res.status(201).json({
//       message: "Hostel added successfully",
//       hostel: newHostel
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });


// // --------------------
// // HARD-CODED ROUTES (OLD BEHAVIOR KEPT)
// // --------------------
// app.get("/api/hostels", (req, res) => res.json(hostels));

// app.get("/api/hostels/:id", (req, res) => {
//   const hostel = hostels.find(h => h.id == req.params.id);
//   if (!hostel) {
//     return res.status(404).json({ error: "Hostel not found" });
//   }
//   res.json(hostel);
// });

// app.post("/api/hostels/search", (req, res) => {
//   const { location } = req.body;
//   const results = hostels.filter(h =>
//     h.location.toLowerCase().includes(location.toLowerCase())
//   );
//   res.json(results);
// });

// app.use("/api/hostels", hostelRoutes);
// // --------------------
// // DB ROUTES (NEW)
// // --------------------
// app.use("/api/hostels/db", hostelRoutes);

// // --------------------
// // SERVE FRONTEND
// // --------------------
// const frontendPath = path.join(__dirname, "hostel-booking/dist");

// if (fs.existsSync(frontendPath)) {
//   app.use(express.static(frontendPath));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
//   });
// } else {
//   console.warn("⚠️ Frontend build folder not found.");
// }

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Backend running on http://localhost:${PORT}`);
// });

require("dotenv").config();
const authRoutes = require("./routes/auth");
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const connectDB = require("./config/db");
const hostelRoutes = require("./routes/hostels");
const userRoutes = require("./routes/users");
const app = express();

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// ✅ ONLY MONGODB ROUTES
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hostels", hostelRoutes);

// Serve frontend
const frontendPath = path.join(__dirname, "hostel-booking/dist");
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get("*", (req, res) =>
    res.sendFile(path.join(frontendPath, "index.html"))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
);
