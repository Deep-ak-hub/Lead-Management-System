import { v4 as uuidV4 } from "uuid";

const otpGenerator = () => {
  const uniqueId = uuidV4();
  const otp = uniqueId.replace(/\D/g, "").slice(0, 4);
  return otp.padStart(4, "0");
};

export default otpGenerator;
