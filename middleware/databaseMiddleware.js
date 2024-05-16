const createDatabaseConnection = require("../model/database");

const databaseMiddleware = (req, res, next) => {
  req.db = createDatabaseConnection();
  res.on("finish", () => {
    if (req.db) {
      req.db.end((err) => {
        if (err) {
          console.error("Error closing the database connection:", err);
        } else {
          console.log("Database connection closed");
        }
      });
    }
  });
  next();
};

module.exports = databaseMiddleware;
