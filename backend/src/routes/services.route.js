import express from "express";
import {
  postService,
  getAllService,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";
import { validateBodyData } from "../middleware/validator.middleware.js";
import {
  createServiceDTO,
  updateServiceDTO,
} from "../validation/services.validator.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/service",
  authMiddleware(),
  validateBodyData(createServiceDTO),
  postService,
);
router.get("/service", authMiddleware(), getAllService);
router.put(
  "/service/:id",
  authMiddleware(),
  validateBodyData(updateServiceDTO),
  updateService,
);
router.delete("/service/:id", authMiddleware(), deleteService);

export default router;
