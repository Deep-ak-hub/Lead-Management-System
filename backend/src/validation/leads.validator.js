import Joi from "joi";

const statusExp = /^(Active|Follow up|Uncategorized|Client|Student)?/;
const inquiryExp = /^(course|project)?/;

export const createLeadsDTO = Joi.object({
  name: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Service name is required",
    "string.min": "Service name must be at least 3 characters",
  }),
  email: Joi.string().email().required().lowercase().trim(),
  phone: Joi.string().required().trim(),
  status: Joi.string().regex(statusExp).default("Active"),
  followUp: Joi.date().optional(),
  isFollowedUp: Joi.boolean().optional().default(false),
  inquiry: Joi.string().regex(inquiryExp).optional(),
  remarks: Joi.string().trim().optional(),
});

export const updateLeadsDTO = Joi.object({
  status: Joi.string().regex(statusExp).default("Active"),
  followUp: Joi.date().optional(),
  isFollowedUp: Joi.boolean().optional().default(false),
  inquiry: Joi.string().regex(inquiryExp).optional(),
  remarks: Joi.string().trim().optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update the lead",
  });
