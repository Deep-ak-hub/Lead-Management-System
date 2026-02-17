import React, { useState } from "react";
import { useVerifyOtpMutation } from "../../redux/Api/Admin";
import { useLocation, useNavigate } from "react-router";

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");

  const [GetOtp] = useVerifyOtpMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await GetOtp({
        email: location.state.email,
        otp,
      });

      if (response?.data?.message) {
        navigate("/reset-password", {
          state: { email: location.state.email },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white/5 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl text-white font-semibold text-center mb-4">
            Enter OTP
          </h2>
          <p className="text-gray-200 text-center mb-4">
            Enter the OTP sent to your email.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary text-center text-lg tracking-widest"
              placeholder="XXXX"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 px-4 rounded transition"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Otp;
