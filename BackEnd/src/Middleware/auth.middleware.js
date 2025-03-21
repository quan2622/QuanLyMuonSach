const ApiError = require("../api-error");
const staffModel = require("../models/staff.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.authenTokenAdmin = async (req, res, next) => {
  console.log(`Token admin: ${req.cookies.token}`);
  try {
    const token = req.cookies.token;
    if (!token) return next(new ApiError(401, "Vui lòng đăng nhập"));

    const record = jwt.verify(token, process.env.SECRET_KEY);
    if (!record.chucVu) {
      return next(new ApiError(401, "Vui lòng đăng nhập đúng tài khoản"));
    }
    res.locals.user = record;
    console.log(res.locals.user);
    next();
  } catch (error) {
    console.log(error);
    return next(new ApiError("Lỗi trong quá trình xác thực"));
  }
}

module.exports.authenTokenUser = async (req, res, next) => {
  console.log(`Token User: ${req.cookies.token}`);
  try {
    const token = req.cookies.token;
    if (!token) return next(new ApiError(401, "Vui lòng đăng nhập"));

    const record = jwt.verify(token, process.env.SECRET_KEY);
    if (record.chucVu) {
      return next(new ApiError(401, "Vui lòng đăng nhập đúng tài khoản"));
    }
    res.locals.user = record;
    next();
  } catch (error) {
    console.log(error);
    return next(new ApiError("Lỗi trong quá trình xác thực"));
  }
}
