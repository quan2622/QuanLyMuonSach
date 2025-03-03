const ApiError = require("../api-error");
const staffModel = require("../models/staff.model");
const userModel = require("../models/user.model");

module.exports.requireAuthAdmin = async (req, res, next) => {
  console.log(`Token admin: ${req.cookies.token}`);
  if (!req.cookies.token) {
    return next(new ApiError(401, "Vui lòng đăng nhập"))
  } else {
    const user = await staffModel.findOne({ token: req.cookies.token });
    if (!user) return next(new ApiError("Vui lòng đăng nhập đúng tài khoản"));
    else {
      res.locals.user = user;
      next();
    }
  }
}

module.exports.requireAuthUser = async (req, res, next) => {
  console.log(`Token user: ${req.cookies.token}`);
  if (!req.cookies.token) {
    return next(new ApiError(401, "Vui lòng đăng nhập"))
  } else {
    const user = await userModel.findOne({ token: req.cookies.token });
    if (!user) return next(new ApiError("Vui lòng đăng nhập đúng tài khoản"));
    else {
      res.locals.user = user;
      next();
    }
  }
}