import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import Logo from "../../components/logo/Logo";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    registerUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-green-600 p-12">
          <div className="mb-6">
            <Logo></Logo>
          </div>

          <h1 className="text-4xl font-bold leading-tight">
            Welcome to <br />
            Expense Tracker
          </h1>

          <p className="mt-5 text-lg">Track and manage your expense here ...</p>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12">
          <div className="mb-8 text-center">
            <div className="flex flex-col items-center lg:hidden mb-4 bg-green-600 rounded-2xl p-5">
              <div>
                <Logo />
              </div>
              <p className="font-bold text-2xl my-5">Welcome Here!</p>
            </div>

            <h2 className="text-3xl font-bold text-gray-800">SignUp Now!</h2>

            <p className="text-gray-500 mt-2">
              SignUp to start buying and selling.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                    message:
                      "Password must be at least 8 characters and contain 1 uppercase letter, 1 digit, and 1 special character",
                  },
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm password"
                className="w-full border border-gray-300 text-black rounded-xl px-4 py-3"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords did not matched",
                })}
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl mt-3"
            >
              SignUp
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?
            <NavLink to="/login" className="text-green-600 font-medium ml-2">
                Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
