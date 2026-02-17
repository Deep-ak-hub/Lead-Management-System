// apiError.js
const apiError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = statusCode;
  error.isOperational = true;

  error.response = {
    message,
    data: null,
    statusCode,
  };

  return error;
};

export default apiError;
