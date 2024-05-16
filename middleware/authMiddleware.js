const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/appConfig");
const database = require("../model/database");

const authMiddleware = async (req, res, next) => {
  // Get the token from the request headers, cookies, or wherever it's stored
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent
  if (token === null) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, SECRET, { algorithm: "HS256" });

    // Check if user still exists in the database
    const [user] = await database.query("SELECT * FROM users WHERE id = ?", [
      decodedToken.userId,
    ]);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Attach the user object to the request for later use
    req.user = user;

    // Call next middleware
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
