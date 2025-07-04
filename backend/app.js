const express = require("express");
const verifyToken = require("./auth/verifyToken");

const profileRoutes = require("./routes/profile");

const app = express();
app.use(express.json());

// Protected routes
app.use("/api/profile", verifyToken, profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});