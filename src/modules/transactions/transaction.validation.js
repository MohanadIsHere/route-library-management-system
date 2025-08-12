import joi from "joi";

export const createTransactionValidationSchema = {
  body: joi.object({
    bookId: joi.string().required().messages({
      "any.required": "bookId is required",
    }),
    numberOfCopies: joi.number().positive().required().messages({
      "any.required": "numberOfCopies is required",
    }),
    returnDate: joi.date(),
    borrowDate: joi.date(),
  }).options({ abortEarly: false, allowUnknown: false }),
};
export const updateTransactionValidationSchema = {
  body: joi
    .object({
      bookId: joi.string().required().messages({
        "any.required": "bookId is required",
      }),
      numberOfCopies: joi.number().positive().required().messages({
        "any.required": "numberOfCopies is required",
      })
    })
    .options({ abortEarly: false, allowUnknown: false }),
};