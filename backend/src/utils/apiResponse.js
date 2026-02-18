export const apiResponse = (
  res,
  statusCode = 200,
  data = null,
  message = "Success",
) => {
  res.status(statusCode).json({
    message,
    data,
    statusCode,
  });
};
