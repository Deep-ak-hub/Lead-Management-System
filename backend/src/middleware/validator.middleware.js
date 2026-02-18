import asyncHandler from "../utils/asyncHandler.js";

export const validateBodyData = (schema) => {
  return asyncHandler(async (req, res, next) => {
    try {
      const data = req.body;

      if (!data) {
        next({
          code: 422,
          message: "Empty Payload",
          status: "EMPTY_PAYLOAD_ERR",
        });
      }
      const validate = await schema.validate(data, { abortEarly: false });
      if (validate.error) {
        throw validate.error;
      }

      await schema.validateAsync(data, { abortEarly: false });
      next();
    } catch (exception) {
      let errorBag = {};

      if (exception && exception.details.length) {
        exception.details.map((error) => {
          let field = error.path.pop();
          errorBag[field] = error.message;
        });
      }
      throw {
        details: errorBag,
        statusCode: 400,
        message: "validaton failed",
        status: "VALIDATION_FAILED_ERR",
      };
    }
  });
};
