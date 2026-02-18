import Leads from "../models/leads.model.js";
import Service from "../models/service.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { leadService } from "../DB_Services/leads.service.js";
import { adminService } from "../DB_Services/admin.service.js";

/**
 * Add a new lead
 */
export const postLeads = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { userId } = req.user;
  const data = { ...req.body, admin: userId };

  adminService.validateAdminId(userId);

  await leadService.validateExistingUser(email, userId);

  const user = await leadService.createLeads(data);

  return apiResponse(res, 201, user, "Successfully added the information");
});

// Get all leads with pagination, filters, and search
export const getLeads = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const { search, status, date, inquiry } = req.query;
  const { userId } = req.user;

  adminService.validateAdminId(userId);

  const filter = { admin: userId };

  if (status) filter.status = status;
  if (inquiry) filter.inquiry = inquiry;

  if (date) {
    let start, end;

    if (date === "today") {
      start = new Date();
      start.setHours(0, 0, 0, 0);
      end = new Date(start);
      end.setDate(start.getDate() + 1);
    } else {
      start = new Date(date);
      start.setHours(0, 0, 0, 0);
      end = new Date(start);
      end.setDate(start.getDate() + 1);
    }

    filter.followUp = { $gte: start, $lt: end };
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const [leads, total] = await Promise.all([
    Leads.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Leads.countDocuments(filter),
  ]);

  const pagination = {
    total,
    page,
    limit,
    totalPage: Math.ceil(total / limit),
  };

  return apiResponse(
    res,
    200,
    { leads, pagination },
    "Leads retrieved successfully",
  );
});

// Get a single lead by ID
 
export const getLeadById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { userId } = req.user;

  adminService.validateAdminId(userId);

  const existingUser = await leadService.getSingleRowByfilter({
    _id: id,
    admin: userId,
  });

  if (!existingUser) {
    throw apiError("User not found", 404);
  }

  const service = existingUser.service
    ? await leadService.getSingleRowByfilter(existingUser.service)
    : null;

  const user = { ...existingUser._doc, service };
  return apiResponse(res, 200, user, "User retrieved successfully");
});

// Update a lead by ID
 
export const updateLead = asyncHandler(async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const { userId } = req.user;

  adminService.validateAdminId(userId);

  const leadId = await leadService.validateLeadId(id);

  const user = await leadService.updateLeads(data, {
    _id: leadId._id,
    admin: userId,
  });

  if (!user) {
    throw apiError("User not found", 404);
  }

  return apiResponse(res, 200, user, "User updated successfully");
});

// Delete a lead by ID
export const deleteLead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  adminService.validateAdminId(userId);

  const leadId = await leadService.validateLeadId(id);

  await leadService.deleteLeadById({ _id: leadId._id, admin: userId });
  return apiResponse(res, 200, null, "User deleted successfully");
});
