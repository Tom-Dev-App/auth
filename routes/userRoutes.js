const express = require("express");
const app = express();
const router = express.Router();
const userController = require("../controllers/userController");
const { checkSchema } = require("express-validator");
const createUserValidation = require("../validations/createUserValidation");
const updateUserValidation = require("../validations/updateUserValidation");

// ROUTE http://localhost:8000/

// ROUTING Users
// Ambil data semua users
router.get("/", userController.getAllUsers);

// METHOD POST MENAMBAHKAN DATA USER BARU
router.post(
  "/",
  checkSchema(createUserValidation),
  userController.createNewUser
);

// PUT METHOD Mengupdate data user sesuai dengan ID-nya
router.put("/:id", userController.updateUserById);

// METHOD DELETE untuk menghapus user
router.delete(
  "/:id",
  checkSchema(updateUserValidation),
  userController.deleteUserById
);

// METHOD GET dengan paramter id
router.get("/:id", userController.getUserById);

module.exports = router;
