import { NODE_ENV } from "../config/env.js";

const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    // Mongoose CastError (bad ObjectId)
    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message);
      error.statusCode = 404;
    }

    // Mongoose duplicate key
    else if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      const message = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } already exists`;
      error = new Error(message);
      error.statusCode = 409;
    }

    // Mongoose validation error
    else if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    // JWT token expired
    else if (err.name === "TokenExpiredError") {
      const message = "Your token has expired";
      error = new Error(message);
      error.statusCode = 401;
    }

    // JWT invalid token
    else if (err.name === "JsonWebTokenError") {
      const message = "Invalid token";
      error = new Error(message);
      error.statusCode = 401;
    }

    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
      success: false,
      errors: error.errors ? error.errors : undefined,
      stack: NODE_ENV === "development" ? error.stack : undefined,
    });
  } catch (catchError) {
    // Fallback error response
    console.error("Error in error middleware:", catchError);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export default errorMiddleware;
