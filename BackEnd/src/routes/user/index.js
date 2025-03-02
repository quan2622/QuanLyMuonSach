const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const homeRoutes = require("./home.route");

module.exports = (app) => {
  app.use("/account", userRoutes);
  app.use("/auth", authRoutes);
  app.use("/home", homeRoutes);
};
