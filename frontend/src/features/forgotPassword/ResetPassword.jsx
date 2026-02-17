import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useUpdateAdminMutation } from "../../redux/Api/Admin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [viewPassword, setViewPassword] = useState(false);

  const [updateAdmin, { isLoading }] = useUpdateAdminMutation();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/");
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      toast.error("Enter same password.");
      return;
    }
    const res = await updateAdmin({
      email: location?.state?.email,
      password: password.newPassword,
      confirmPassword: password.newPassword,
    });

    if (res.data.statusCode == 200) {
      toast.success(res.data.message);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-background-light p-4 rounded min-w-75 mb-10">
        <h1 className="text-xl text-center font-bold">Reset Password</h1>
        <form className="font-semibold" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="newPassword"
              className="text-lg font-semibold text-gray-700"
            >
              New Password
            </label>
            <div className="bg-white border border-gray-300 rounded-lg p-2 focus:ring focus:ring-primary outline-none my-2 flex items-center justify-between">
              <input
                type={viewPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="newPassword"
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
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="text-lg font-semibold text-gray-700"
            >
              Password
            </label>
            <div className="bg-white border border-gray-300 rounded-lg p-2 focus:ring focus:ring-primary outline-none my-2 flex items-center justify-between">
              <input
                type={viewPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="confirmPassword"
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
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 disabled:bg-gray-500 bg-primary text-white font-semibold rounded-lg mt-4"
          >
            {isLoading ? "Loading..." : "Confirm"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
