import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/actions";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
    dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 px-4">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="w-full max-w-md bg-white rounded-3xl shadow-lg p-10 sm:p-12 border border-gray-200 transition-transform transform hover:scale-[1.02]"
        aria-label="Login Form"
      >
        <div className="flex flex-col items-center mb-8">
          <AiOutlineLogin className="text-indigo-600 text-6xl mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900 font-montserrat">
            Welcome Back
          </h1>
          <p className="mt-1 text-gray-600 text-sm">Please login to your account</p>
        </div>

        <div className="space-y-6">
          <InputField
            label="Username"
            required
            id="username"
            type="text"
            message="*Username is required"
            placeholder="Enter your username"
            register={register}
            errors={errors}
            className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />

          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Enter your password"
            register={register}
            errors={errors}
            className="rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          disabled={loader}
          type="submit"
          className={`mt-8 w-full flex justify-center items-center gap-2 py-3 rounded-xl font-semibold text-white transition-all duration-200 ${
            loader
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600"
          } shadow-lg`}
          aria-busy={loader}
        >
          {loader ? (
            <>
              <Spinners /> Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-800 underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
