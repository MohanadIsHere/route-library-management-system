import joi from "joi";
import { roles } from "../../database/models/user.model.js";
export const registerValidationSchema = {
  body: joi
    .object({
      name: joi.string().required().messages({
        "any.required": "name is required",
      }),
      email: joi.string().email().required().messages({
        "any.required": "email is required",
      }),
      password: joi.string().required().messages({
        "any.required": "password is required",
      }),
      role: joi.string().valid(roles.admin, roles.member).required().messages({
        "any.required": "role is required",
        "any.only": "role must be admin or member",
      }),
    })
    .options({ allowUnknown: false, abortEarly: false }),
};
export const loginValidationSchema = {
  body: joi
    .object({
      email: joi.string().email().required().messages({
        "any.required": "email is required",
      }),
      password: joi.string().required().messages({
        "any.required": "password is required",
      }),
    })
    .options({ allowUnknown: false, abortEarly: false }),
};
