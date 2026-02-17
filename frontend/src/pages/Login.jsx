import React, { useState } from "react";
import {
  useResetPasswordMutation,
  useSigninAdminMutation,
} from "../redux/Api/Admin";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { login } from "../redux/Slice/AdminSlice";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loginAdmin, { isLoading }] = useSigninAdminMutation();
  const [resetPassword, { error, isLoading: isLoadingReset }] =
    useResetPasswordMutation();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await loginAdmin(loginData);

    if (response?.data?.statusCode !== 200) {
      const errors = response?.error?.data?.message;

      if (typeof errors === "object") {
        Object.values(errors).forEach((msg) => {
          toast.error(msg);
        });
      } else if (errors) {
        toast.error(errors);
      }

      return;
    }

    const accessToken = response.data.data.accessToken;
    localStorage.setItem("admin", accessToken);
    dispatch(login(accessToken));
    toast.success(response.data.message);
    navigate("/dashboard");
  };

  //for reset password
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await resetPassword({ email });

      // Standardized API response: { status, message, data, statusCode }
      const resData = response.data;

      if (resData.statusCode !== 200) {
        throw new Error(resData.message || "Failed to send OTP");
      }

      // Success
      localStorage.setItem("Id", resData.data.adminId);
      navigate("/otp", { state: { email } });
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong");
      console.error("Reset password error:", err);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="bg-white/5 shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center text-gray-300 mb-6 underline underline-offset-8">
            Admin Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-lg font-semibold text-gray-200"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-lg p-2 focus:ring focus:ring-primary outline-none my-2"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-lg font-semibold text-gray-200"
                >
                  Password
                </label>
                <div className="bg-white border border-gray-300 rounded-lg p-2 focus:ring focus:ring-primary outline-none my-2 flex items-center justify-between">
                  <input
                    type={viewPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    name="password"
                    onChange={handleChange}
                    className="outline-0 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setViewPassword(!viewPassword)}
                  >
                    {viewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white text-lg font-semibold py-2 rounded-lg cursor-pointer hover:-translate-y-1 transition-all"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>

            <button
              onClick={handleForgotPassword}
              className="text-white hover:text-primary cursor-pointer underline underline-offset-2"
            >
              Forgot Password
            </button>
          </form>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        overlayClassName="fixed backdrop-blur-sm top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center"
        className="bg-white/5 backdrop-blur-2xl p-6 rounded-lg shadow-lg min-w-74"
      >
        <h2 className="text-xl text-white font-semibold mb-4">
          Reset Password
        </h2>
        <p className="text-gray-300 mb-2">Receive OTP on email.</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage("");
          }}
          className="bg-white w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary"
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
        <div className="flex justify-start gap-2 mt-4">
          <button
            onClick={handleSendEmail}
            disabled={isLoadingReset}
            className="bg-primary disabled:bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            {isLoadingReset ? "Loading..." : "Send Email"}
          </button>
          <button
            onClick={() => {
              setIsModalOpen(false);
              setErrorMessage("");
            }}
            className="bg-gray-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Login;
