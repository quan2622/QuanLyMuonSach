const systemConfig = require("../../config/system.config");
const bookRoutes = require("./book.route");
const publisherRoutes = require("./publisher.route");
const staffRoutes = require("./staff.route");
const authRoutes = require("./auth.route")
const borrowRoutes = require("./borrow.route");

const authMiddleware = require("../../Middleware/auth.middleware");

module.exports = (app) => {
  const ADMIN_PATH = systemConfig.prefixAdmin;
  app.use(ADMIN_PATH + "/book", authMiddleware.authenTokenAdmin, bookRoutes);
  app.use(ADMIN_PATH + "/publisher", authMiddleware.authenTokenAdmin, publisherRoutes);
  app.use(ADMIN_PATH + "/account", staffRoutes);
  app.use(ADMIN_PATH + "/auth", authRoutes);
  app.use(ADMIN_PATH + "/borrow", authMiddleware.authenTokenAdmin, borrowRoutes);
};
