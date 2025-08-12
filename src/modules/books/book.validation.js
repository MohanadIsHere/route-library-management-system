import joi from "joi";

export const createBookValidationSchema = {
  body: joi
    .object({
      title: joi.string().required().messages({
        "any.required": "title is required",
      }),
      author: joi.string().required().messages({
        "any.required": "author is required",
      }),
      publishedYear: joi.number().required().positive().messages({
        "any.required": "publishedYear is required",
        "number.base": "publishedYear must be a number",
        "number.positive": "publishedYear must be a positive number",
      }),
      availableCopies: joi.number().required().positive().min(0).messages({
        "any.required": "availableCopies is required",
        "number.base": "availableCopies must be a number",
        "number.positive": "availableCopies must be a positive number",
        "number.min": "availableCopies must be a positive number",
      }),
    })
    .options({ abortEarly: false, allowUnknown: false }),
};
export const updateBookValidationSchema = {
  body: joi
    .object({
      title: joi.string(),
      author: joi.string(),
      publishedYear: joi.number().positive().messages({
        "number.base": "publishedYear must be a number",
        "number.positive": "publishedYear must be a positive number",
      }),
      availableCopies: joi.number().positive().min(0).messages({
        "number.base": "availableCopies must be a number",
        "number.positive": "availableCopies must be a positive number",
        "number.min": "availableCopies must be a positive number",
      }),
    })
    .options({ abortEarly: false, allowUnknown: false }),
  params: joi
    .object({
      id: joi.string().required().messages({
        "any.required": "id is required",
      }),
    })
    .options({ allowUnknown: false }),
};
export const deleteBookValidationSchema = {
  params: joi
    .object({
      id: joi.string().required().messages({
        "any.required": "id is required",
      }),
    })
    .options({ allowUnknown: false }),
};
export const searchBookValidationSchema = {
  query: joi
    .object({
      q: joi.string().required().messages({
        "any.required": "q is required",
      }),
      page: joi.number().positive().messages({
        "number.base": "page must be a number",
        "number.positive": "page must be a positive number",
      }),
      limit: joi.number().positive().messages({
        "number.base": "limit must be a number",
        "number.positive": "limit must be a positive number",
      }),
    })
    .options({ allowUnknown: false }),
}