import crypto from "crypto";
import apiError from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { jwtToken } from "../utils/jwtTokenGenerator.js";
import { sendEmailFP } from "../utils/sendEmail.js";
import otpGenerator from "../utils/otpGenerator.js";
import { adminService } from "../DB_Services/admin.service.js";
import { comparePassword } from "../utils/password.utils.js";

// Create Admin
export const postAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingAdmin = await adminService.getSingleRowByFilter({
    email: email,
  });
  // console.log(existingAdmin);

  if (existingAdmin) {
    throw apiError("Admin already exist", 400);
  }

  const admin = await adminService.createUser({
    email: email,
    password: password,
    role: "admin",
  });
  return apiResponse(res, 201, admin, "Admin created");
});

// Admin Login
export const postLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // console.log(email, password);

  const adminDetails = await adminService.getSingleRowByFilter({
    email: email,
  });
  if (!adminDetails) {
    return apiResponse(res, 401, null, "Email not found");
  }

  const isPasswordMatch = await comparePassword(
    password,
    adminDetails.password,
  );
  if (!isPasswordMatch) {
    return apiResponse(res, 401, null, "Password is incorrect");
  }

  const accessToken = jwtToken(adminDetails._id);
  const data = {
    email: adminDetails.email,
    role: adminDetails.role,
    accessToken,
  };
  return apiResponse(res, 200, data, "Login successful");
});

// Get Admin Details
export const adminDetails = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const getAdminDetails = await adminService.getSingleRowByFilter({
    _id: userId,
  });

  const details = adminService.getAdminPublicProfile(getAdminDetails);

  if (!details) {
    throw apiError("Admin not found", 404);
  }

  return apiResponse(res, 200, details, "Admin retrieved successfully");
});

export const getAllAdmins = asyncHandler(async (req, res) => {
  const allAdmins = await adminService.getAllAdminProfile({ role: "admin" });
  const data = allAdmins.map((el) => adminService.getAdminPublicProfile(el));
  // adminService.getAdminPublicProfile(allAdmins);
  return apiResponse(res, 200, data, "All admin retrieved successfully");
});

// Forget Password
export const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const admin = await adminService.getSingleRowByFilter({ email: email });
  if (!admin) {
    throw apiError("No admin found with this email", 404);
  }

  const otp = otpGenerator();
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  admin.otp = hashedOtp;
  admin.otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  await admin.save();

  await sendEmailFP({
    to: admin.email,
    subject: "Reset Password OTP",
    html: `This OTP expires in 5 minutes. Do not share your OTP<br/><b>${otp}</b>`,
  });

  return apiResponse(
    res,
    200,
    { adminId: admin._id },
    "OTP is sent to reset password",
  );
});

// Verify OTP
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw apiError("OTP or email missing", 400);
  }

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
  const admin = await adminService.getSingleRowByFilter({
    email: email,
    otp: hashedOtp,
  });

  if (!admin) {
    throw apiError("Invalid or expired OTP", 400);
  }

  admin.otp = undefined;
  admin.otpExpiresAt = undefined;
  await admin.save();

  return apiResponse(res, 200, null, "OTP verified successfully");
});

// Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // return apiResponse(res, 200, userResponse, "Admin updated successfully");
  const user = await adminService.getSingleRowByFilter({ email: email });

  if (!user) {
    throw apiError("Admin not found", 404);
  }

  await adminService.updateSingleRowByFilter(
    { email: user.email },
    { password },
  );
  return apiResponse(res, 200, null, "password updated successfully");
});

// Logout
export const logout = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw apiError("Admin not found", 400);
  }

  return apiResponse(res, 200, null, "Logged out successfully");
});
