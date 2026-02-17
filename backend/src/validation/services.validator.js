import Joi from "joi";

export const createServiceDTO = Joi.object({
  title: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Service name is required",
    "string.min": "Service name must be at least 3 characters",
  }),
  fee: Joi.number().required(),
});

export const updateServiceDTO = Joi.object({
  title: Joi.string().trim().min(2).max(75).optional().messages({
    "string.min": "Service name must be at least 3 characters",
  }),
  fee: Joi.number().optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update the service",
  });
