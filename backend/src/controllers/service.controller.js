import Service from "../models/service.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { adminService } from "../DB_Services/admin.service.js";
import { servicesService } from "../DB_Services/services.service.js";

/**
 * Add a new service
 */
export const postService = asyncHandler(async (req, res) => {
  const { title, fee } = req.body;
  const { userId } = req.user;

  adminService.validateAdminId(userId);

  await servicesService.validateExistingService({ title: title });

  const data = { title: title, admin: userId, fee: fee };

  const newService = await servicesService.createNewService(data);

  return apiResponse(res, 201, newService, "Service added successfully");
});

/**
 * Get all services
 */
export const getAllService = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  adminService.validateAdminId(userId);

  const services = await servicesService.getAllServices({ admin: userId });

  return apiResponse(res, 200, services, "Services retrieved successfully");
});

/**
 * Update a service by ID
 */
export const updateService = asyncHandler(async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const { userId } = req.user;

  adminService.validateAdminId(userId);

  const serviceId = await servicesService.validateServiceId(id);

  const update = await servicesService.updateService(data, {
    _id: serviceId,
    admin: userId,
  });

  return apiResponse(res, 200, update, "Service updated successfully");
});

/**
 * Delete a service by ID
 */
export const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  adminService.validateAdminId(userId);

  const serviceId = await servicesService.validateServiceId(id);

  await servicesService.deleteServiceById({
    _id: serviceId._id,
    admin: userId,
  });
  return apiResponse(res, 200, null, "Service deleted successfully");
});
