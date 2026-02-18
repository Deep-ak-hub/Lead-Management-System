import express from "express";
import {
  postLeads,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/leads.controller.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateBodyData } from "../middleware/validator.middleware.js";
import {
  createLeadsDTO,
  updateLeadsDTO,
} from "../validation/leads.validator.js";

const router = express.Router();

router.post(
  "/lead/",
  authMiddleware(),
  validateBodyData(createLeadsDTO),
  postLeads,
);
router.get("/lead/", authMiddleware(), getLeads);
router.get("/lead/:id/", authMiddleware(), getLeadById);
router.put(
  "/lead/:id/",
  authMiddleware(),
  validateBodyData(updateLeadsDTO),
  updateLead,
);
router.delete("/lead/:id/", authMiddleware(), deleteLead);

export default router;
