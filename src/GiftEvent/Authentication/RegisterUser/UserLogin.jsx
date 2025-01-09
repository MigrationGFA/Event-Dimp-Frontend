import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoginImage from "../../../assets/login-image.png";
import Logo from "../../../assets/DIMP logo colored.png";
import { Link, useNavigate } from "react-router-dom";
import { ButtonLongPurple } from "../../../component/Buttons";
import { LongInputWithPlaceholder } from "../../../component/Inputs";
import { Heading, Text } from "../../../component/Text";
import { useDispatch, useSelector } from "react-redux";
import { creatorLogin } from "../../../features/authentication";
import { showToast } from "../../../component/ShowToast";
import { setEcosystemDomain } from "../../../features/ecosystemDomain";
import { setEcosystemPlan } from "../../../features/ecosystemPlan";

// Define the Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  // Set up the form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      // Dispatch the login action
      const resultAction = await dispatch(
        creatorLogin({
          email: data.email,
          password: data.password,
        })
      );

      if (creatorLogin.rejected.match(resultAction)) {
        // Login failed, access the payload from the rejected action
        const errorPayload = resultAction.payload;
        showToast(errorPayload);
      } else if (creatorLogin.fulfilled.match(resultAction)) {
        // Login was successful
        showToast(resultAction.payload.message);

        if (resultAction.payload.user.ecosystemDomain) {
          dispatch(
            setEcosystemDomain(resultAction.payload.user.ecosystemDomain)
          );
        }
        if (resultAction.payload.user.plan) {
          dispatch(setEcosystemPlan(resultAction.payload.user.plan));
        }
        if (resultAction.payload.user.step === 3) {
          navigate("/auth/select-website-design");
        } else if (resultAction.payload.user.step === 4) {
          navigate("/auth/subscription");
        } else if (resultAction.payload.user.step === 5) {
          navigate("/creator/dashboard/general-overview");
        } else {
          navigate("/auth/selection");
        }
      }
    } catch (error) {
      // Handle unexpected errors, such as network issues
      showToast("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-body">
      <div className="w-full max-w-4xl mx-4">
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden my-20">
          <div className="hidden lg:block lg:w-1/2 bg-cover px-10 py-20">
            <img src={LoginImage} alt="Login" />
          </div>

          <div className="w-full lg:w-1/2 p-8">
            <Link to="/">
              <img src={Logo} alt="Logo" className="w-[73px] lg:w-[73px]" />
            </Link>

            <Heading
              level={3}
              className="mb-4 mt-7 font-semibold text-primary4"
              size="3xl"
            >
              Welcome Back
            </Heading>

            <Text className="mb-6" color="sec6">
              Sign in to continue
            </Text>

            <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <LongInputWithPlaceholder
                  type="email"
                  placeholder="johndoe@mail.com"
                  className={`mt-2 focus:ring-1 focus:ring-purple-600 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <LongInputWithPlaceholder
                  type="password"
                  placeholder="••••••••"
                  className={`mt-2 focus:ring-1 focus:ring-purple-600 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end items-center mb-6">
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Text className="mt-16 mb-5 text-center text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/auth/selection"
                  className="text-purple-600 hover:underline"
                >
                  Sign Up
                </Link>
              </Text>

              {isLoading ? (
                <ButtonLongPurple
                  className="w-full opacity-50"
                  type="submit"
                  disabled
                >
                  Logging In...
                </ButtonLongPurple>
              ) : (
                <ButtonLongPurple className="w-full" type="submit">
                  Login
                </ButtonLongPurple>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
