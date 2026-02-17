import apiError from "../utils/apiError.js";

export const notFound = (req, res, next) => {
  next(apiError(`Route not found: ${req.originalUrl}`, 404));
};

export const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const status = err.status || "fail";
  const details = err.details;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    message,
    details,
    status,
    statusCode,
  });
};
