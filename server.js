const express = require("express");
const app = express();
const errorhanlder = require("./middleware/errorHandler");
const logger = require("./middleware/logger");
const upload = require("./utils/upload");
const multerError = require("./middleware/multerError");
const userRoutes = require("./routes/userRoutes");
const { BASE_URL, PORT } = require("./config/appConfig");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
// Middleware
// Ambil data dari client yang dikirim berbentuk json
app.use(express.json());

// Menangangi data dari client atau browser
app.use(express.urlencoded({ extended: true }));

// Manangani ERROR
app.use(errorhanlder);
// LOG MIDDLEWARE
app.use(logger);

// FILE UPLOAD
app.post("/file-upload", upload.single("file"), [multerError], (req, res) => {
  res.json({ message: "File uploaded!" });
});
// METHOD GET
app.get("/", (req, res) => {
  res.json({
    message: "Berhasil melakukan routing✨",
  });
});

app.use("/api/auth", authRoutes);

app.use(authMiddleware);
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server is running on ${BASE_URL}:${PORT}`));
