import jwt from "jsonwebtoken";
import apiError from "../utils/apiError.js";
import { adminService } from "../DB_Services/admin.service.js";

export const authMiddleware = (allowedRoles = null) => {
  return async (req, res, next) => {
    try {
      let token = req.headers.authorization;

      if (!token) {
        throw apiError(apiError("Login Required", 401));
      }

      token = token.replace("Bearer ", "");

      const decoded = jwt.verify(token, process.env.TOKEN);
      // console.log(decoded);

      // req.user = decoded;

      const admin = await adminService.getSingleRowByFilter({
        _id: decoded.userId,
      });

      if (!admin) {
        throw apiError("admin not found", 401);
      }

      req.user = {
        userId: admin._id,
        role: admin.role,
      };

      if (!allowedRoles || allowedRoles.includes(admin.role)) {
        return next();
      }
      throw apiError("Access Denied", 403);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return next(apiError("Session expired. Please login again.", 401));
      }

      if (err.name === "JsonWebTokenError") {
        return next(apiError("Invalid token", 401));
      }
      // console.log(err);
      return next(err);
    }
  };
};
