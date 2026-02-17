import mongoose from "mongoose";
import Projects from "../models/projects.model.js";
import apiError from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { projectService } from "../DB_Services/projects.service.js";
import { leadService } from "../DB_Services/leads.service.js";

export const addProject = asyncHandler(async (req, res) => {
  const data = req.body;
  const { leadId } = req.params;

  data.lead = leadId;
  const project = await projectService.addProject(data);

  return apiResponse(res, 201, project, "Project added successfully");
});

export const getProjects = asyncHandler(async (req, res) => {
  const { leadId } = req.params;
  // console.log(leadId);

  await leadService.validateLeadId(leadId);

  const data = await projectService.getProjects({
    lead: leadId,
  });
  return apiResponse(res, 200, data, "Projects retrieved successfully");
});

export const getProjectById = asyncHandler(async (req, res) => {
  const { id, leadId } = req.params;
  if (!id) {
    throw apiError("Project not found", 404);
  }

  const data = await projectService.getProjectById(id);

  return apiResponse(res, 200, data, "Project retrieved successfully");
});

//rewtire below function with validation add lead id
export const updateProject = asyncHandler(async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  const project = await projectService.updateProjectById(data, { _id: id });

  return apiResponse(res, 200, project, "Project updated successfully");
});
