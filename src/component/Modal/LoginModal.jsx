import { Modal } from "flowbite-react"; // Keep flowbite-react for modal
import { LabelImportant } from "../Label";
import { Text, Heading } from "../Text";
import { ButtonLongPurple } from "../Buttons";
import { MediumInputWithPlaceholder } from "../Inputs";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { creatorLogin } from "../../features/authentication";
import { showToast } from "../ShowToast";
import { setEcosystemDomain } from "../../features/ecosystemDomain";
import { setEcosystemPlan } from "../../features/ecosystemPlan";
import { setEcosystemType } from "../../features/ecosystemType";

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
const LoginModal = ({
  setCurrentStep,
  closeModal,
  isLoginModalOpen,
  setIsLoginModalOpen,
}) => {
  const onCloseModal = () => {
    closeModal(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  // Set up the form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Integrating yup validation
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
        if (resultAction.payload.user.ecosystemType) {
          dispatch(
            setEcosystemType(resultAction.payload.user.ecosystemType)
          );
        }

        if (resultAction.payload.user.plan) {
          dispatch(setEcosystemPlan(resultAction.payload.user.plan));
        }

        if (resultAction.payload.user.step === 2) {
          setCurrentStep(2);
          setIsLoginModalOpen(false);
        } else if (resultAction.payload.user.step === 3) {
          setIsLoginModalOpen(false);
          navigate("/auth/select-website-design");
        } else if (resultAction.payload.user.step === 4) {
          setIsLoginModalOpen(false);
          navigate("/auth/subscription");
        } else {
          setIsLoginModalOpen(false);
          navigate("/creator/dashboard/overview");
        }
      }
    } catch (error) {
      // Handle unexpected errors, such as network issues
      showToast("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      {/* Modal with blur effect */}
      <div
        className={`${
          isLoginModalOpen
            ? "fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
            : ""
        }`}
      >
        <Modal
          show={isLoginModalOpen}
          onClose={onCloseModal}
          popup
          className="max-w-md mx-auto"
        >
          <Modal.Header />
          <Modal.Body>
            <div>
              <Heading level={2} className="text-xl font-semibold mb-4">
                Login
              </Heading>
              <Text color="sec8">
                email is associate with an account. please login to continue
              </Text>
              <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-5">
                  <div className="mb-2 block">
                    <LabelImportant htmlFor="email">
                      Email Address
                    </LabelImportant>
                  </div>
                  <MediumInputWithPlaceholder
                    id="lEmail"
                    placeholder="Enter your email Address"
                    type="text"
                    className={`mt-2 focus:ring-1 focus:ring-purple-600 ${
                      errors.email ? "border-sec8" : ""
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sec8 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mt-5">
                  <div className="mb-2 block">
                    <LabelImportant htmlFor="password">Password</LabelImportant>
                  </div>
                  <MediumInputWithPlaceholder
                    id="lPassword"
                    placeholder="**************"
                    type="password"
                    className={`mt-2 focus:ring-1 focus:ring-purple-600 ${
                      errors.password ? "border-sec8" : ""
                    }`}
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sec8 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary3 hover:underline "
                  >
                    Forgot Password?
                  </Link>
                </div>
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
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default LoginModal;
