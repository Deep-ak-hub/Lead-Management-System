import jwt from "jsonwebtoken";

const jwtToken = (userId) => {
  if (!process.env.TOKEN) {
    throw new Error("TOKEN is not defined in environment variables");
  }

  if (!process.env.DAYS) {
    throw new Error("DAYS is not defined in environment variables");
  }

  return jwt.sign({ userId }, process.env.TOKEN, {
    expiresIn: process.env.DAYS,
  });
};

export { jwtToken };
