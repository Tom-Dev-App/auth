const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  // DESTINATION DISEMPEN DIMANA?
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../files"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extention = path.extname(file.originalname).toLocaleLowerCase();
    cb(null, file.fieldname + "-" + uniqueSuffix + extention);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // MELIMIT FILE YANG DI UPLOAD BIAR G LEBIH DARI 5MB
});

module.exports = upload;
