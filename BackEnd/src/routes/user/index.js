const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const homeRoutes = require("./home.route");
const borrowRoutes = require("./borrow.route");

const authMiddleware = require("../../Middleware/auth.middleware");

module.exports = (app) => {
  app.use("/account", userRoutes);
  app.use("/auth", authRoutes);
  app.use("/home", homeRoutes);
  app.use("/borrow", authMiddleware.requireAuthUser, borrowRoutes);
};
