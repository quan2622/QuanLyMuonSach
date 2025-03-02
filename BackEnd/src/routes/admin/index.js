const systemConfig = require("../../config/system.config");
const bookRoutes = require("./book.route");
const publisherRoutes = require("./publisher.route");
const staffRoutes = require("./staff.route");
const authRoutes = require("./auth.route")

module.exports = (app) => {
  const ADMIN_PATH = systemConfig.prefixAdmin;
  app.use(ADMIN_PATH + "/book", bookRoutes);
  app.use(ADMIN_PATH + "/publisher", publisherRoutes);
  app.use(ADMIN_PATH + "/account", staffRoutes);
  app.use(ADMIN_PATH + "/auth", authRoutes);
};
