import {
  getProjectById,
  getProjects,
  updateProject,
  addProject,
} from "../controllers/projects.controller.js";
import express from "express";
import { validateBodyData } from "../middleware/validator.middleware.js";
import {
  createProjectDTO,
  updateProjectDTO,
} from "../validation/projects.validator.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/lead/:leadId/project",
  authMiddleware(),
  validateBodyData(createProjectDTO),
  addProject,
);
router.get("/lead/:leadId/project", authMiddleware(), getProjects);
router.get("/lead/project/:id", authMiddleware(), getProjectById);
router.put(
  "/lead/project/:id",
  authMiddleware(),
  validateBodyData(updateProjectDTO),
  updateProject,
);

export default router;
