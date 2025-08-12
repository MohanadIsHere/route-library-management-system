export const validation = (schema) => {
  return async (req, res, next) => {
    const validationErrors = [];

    for (const key of Object.keys(schema)) {
      const { error } = schema[key].validate(req[key]);
      
      
      if (error) {
        validationErrors.push(...error.details); 
      }
    }

    if (validationErrors.length > 0) {
      const error = new Error("Validation failed");
      error.statusCode = 400;
      error.errors = validationErrors.map((detail) => ({
        message: detail.message,
        // type : detail.type
      }));
      return next(error);
    }

    next();
  };
};
