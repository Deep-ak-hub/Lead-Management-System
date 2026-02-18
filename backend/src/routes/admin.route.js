import express from "express";
import {
  postAdmin,
  postLogin,
  forgetPassword,
  adminDetails,
  verifyOtp,
  resetPassword,
  getAllAdmins,
} from "../controllers/admin.controller.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateBodyData } from "../middleware/validator.middleware.js";
import {
  forgetPasswordDTO,
  loginDTO,
  RegisterDTO,
  resetPasswordDTO,
} from "../validation/auth.validator.js";

const router = express.Router();

router.post(
  "/admin",
  authMiddleware(["superadmin"]),
  validateBodyData(RegisterDTO),
  postAdmin,
);

router.post("/admin/login", validateBodyData(loginDTO), postLogin);

router.get("/admin", authMiddleware(), adminDetails);

router.get("/admin/adminlist", authMiddleware(["superadmin"]), getAllAdmins);

router.post(
  "/admin/forgot",
  validateBodyData(forgetPasswordDTO),
  forgetPassword,
);

router.post("/admin/verify", verifyOtp);

router.put("/admin/reset", validateBodyData(resetPasswordDTO), resetPassword)

export default router;
