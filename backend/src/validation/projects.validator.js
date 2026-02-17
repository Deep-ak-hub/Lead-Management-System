import Joi from "joi";

export const createProjectDTO = Joi.object({
  name: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Project name is required",
    "string.min": "Project name must be at least 3 characters",
  }),

  totalBudget: Joi.number().positive().required().messages({
    "number.base": "Total budget must be a number",
    "number.positive": "Total budget must be greater than 0",
    "any.required": "Total budget is required",
  }),

  installments: Joi.array()
    .items(
      Joi.object({
        amount: Joi.number().positive().required().messages({
          "number.base": "Installment amount must be a number",
          "number.positive": "Installment amount must be greater than 0",
        }),
        paidDate: Joi.date().optional().messages({
          "date.base": "Paid date must be a valid date",
        }),
      }),
    )
    .optional(),

  startDate: Joi.date().optional().messages({
    "date.base": "Start date must be a valid date",
  }),

  endDate: Joi.date().greater(Joi.ref("startDate")).optional().messages({
    "date.greater": "End date must be after start date",
  }),

  isComplete: Joi.boolean().optional().default(false),
});

export const updateProjectDTO = Joi.object({
  name: Joi.string().trim().min(3).max(100).optional().messages({
    "string.min": "Project name must be at least 3 characters",
  }),
  totalBudget: Joi.number().positive().optional().messages({
    "number.base": "Total budget must be a number",
    "number.positive": "Total budget must be greater than 0",
  }),
  installments: Joi.array()
    .items(
      Joi.object({
        amount: Joi.number().positive().required().messages({
          "number.base": "Installment amount must be a number",
          "number.positive": "Installment amount must be greater than 0",
        }),
        paidDate: Joi.date().optional().messages({
          "date.base": "Paid date must be a valid date",
        }),
        _id: Joi.any().strip(),
      }),
    )
    .optional(),

  startDate: Joi.date().optional().messages({
    "date.base": "Start date must be a valid date",
  }),

  endDate: Joi.date().greater(Joi.ref("startDate")).optional().messages({
    "date.greater": "End date must be greter than start date",
  }),
  lead: Joi.string().optional(),
  isComplete: Joi.boolean().optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update the project",
  });
