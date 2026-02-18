import Joi from "joi";

const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W_-]).{8,25}/;
const RoleExp = /^(superadmin|admin)$/;

export const RegisterDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(PasswordRegex).required().messages({
    "string.empty": "Password cannot be null",
    "string.pattern.base":
      "Password must have an alpha numeric value with a special character and at least 8 to 25",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Password and confirmPassword must be same",
  }),
  role: Joi.string().regex(RoleExp),
});

export const loginDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const forgetPasswordDTO = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(PasswordRegex).required().messages({
    "string.empty": "Password cannot be null",
    "string.pattern.base":
      "Password must have an alpha numeric value with a special character and at least 8 to 25",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Password and confirmPassword must be same",
  }),
});
