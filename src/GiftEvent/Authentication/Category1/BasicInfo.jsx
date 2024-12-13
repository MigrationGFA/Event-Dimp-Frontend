import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  LongInputWithPlaceholder,
} from "../../../component/Inputs";
import { ButtonLongPurple } from "../../../component/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { creatorRegister } from "../../../features/authentication";
import { showToast } from "../../../component/ShowToast";
import { useNavigate, useLocation } from "react-router-dom";
import { LabelImportant } from "../../../component/Label";
import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa"; 
import { MdLockOutline } from "react-icons/md"; 

const BasicInfo = ({ nextStep, handleResponse }) => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string().required("Phone Number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ref = searchParams.get("ref") || "not available";
  const [openModal, setOpenModal] = useState(false);

  const onSubmit = async (data, e) => {
   
    e.preventDefault();

    try {
      // Dispatch the login action
      const resultAction = await dispatch(
        creatorRegister({
          email: data.email,
          password: data.password,
          fullName: data.fullName,
          phoneNumber: data.phone,
          gender: "nil",
          role: "creator",
          refCode: ref,
          organizationName: "not available",
        })
      );

      if (creatorRegister.rejected.match(resultAction)) {
        // Login failed, access the payload from the rejected action
        const errorPayload = resultAction.payload;
        console.log("the console is here");
        showToast(errorPayload);
        handleResponse(errorPayload);
      } else if (creatorRegister.fulfilled.match(resultAction)) {
        // Login was successful
        console.log("this is result action", resultAction.payload.message);
        showToast(resultAction.payload.message, "success");
         handleResponse(resultAction.payload.message);
      }
    } catch (error) {
      showToast("An unexpected error occurred. Please try again.", "error");
    }
  };

  return (
    <div className="w-full flex flex-col h-full max-h-screen overflow-y-auto p-4">
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mb-40 mt-10 font-outfit">
        <div>
            <LabelImportant htmlFor="fullName" >Full Name</LabelImportant>
            <div className="relative">
                <FaUser className="absolute left-3 top-3.5 text-gray-500" />
                <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                        <LongInputWithPlaceholder
                            {...field}
                            id="fullName"
                            placeholder="Enter your full name"
                            className={`w-full border-sec4 bg-primary9 rounded font-Outfit p-2 pl-10 ${
                                errors.fullName ? "border-sec8" : ""
                            }`}
                        />
                    )}
                />
            </div>
            {errors.fullName && <span className="text-sec8">{errors.fullName.message}</span>}
        </div>

        <div>
            <LabelImportant htmlFor="email">Email Address</LabelImportant>
            <div className="relative">
                <FaEnvelope className="absolute left-3 top-3.5 text-gray-500" />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <LongInputWithPlaceholder
                            {...field}
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            className={`w-full border-sec4 bg-primary9 rounded p-2 pl-10 ${
                                errors.email ? "border-sec8" : ""
                            }`}
                        />
                    )}
                />
            </div>
            {errors.email && <span className="text-sec8">{errors.email.message}</span>}
        </div>

        <div>
            <LabelImportant htmlFor="phone">Phone Number</LabelImportant>
            <div className="relative">
                <FaPhone className="absolute left-3 top-3.5 text-gray-500" />
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <LongInputWithPlaceholder
                            {...field}
                            id="phone"
                            placeholder="0700000000"
                            type="tel"
                            className={`w-full border-sec4 bg-primary9 rounded p-2 pl-10 ${
                                errors.phone ? "border-sec8" : ""
                            }`}
                        />
                    )}
                />
            </div>
            {errors.phone && <span className="text-sec8">{errors.phone.message}</span>}
        </div>

        <div className="w-full">
            <LabelImportant htmlFor="password">Password</LabelImportant>
            <div className="relative">
                <MdLockOutline className="absolute left-3 top-3.5 text-gray-500" />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <LongInputWithPlaceholder
                            {...field}
                            id="password"
                            placeholder="************"
                            type="password"
                            className={`w-full border-sec4 bg-primary9 rounded p-2 pl-10 ${
                                errors.password ? "border-sec8" : ""
                            }`}
                        />
                    )}
                />
            </div>
            {errors.password && <span className="text-sec8">{errors.password.message}</span>}
        </div>

        <div className="w-full mt-4 lg:mt-0">
            <LabelImportant htmlFor="confirmPassword">Confirm Password</LabelImportant>
            <div className="relative">
                <MdLockOutline className="absolute left-3 top-3.5 text-gray-500" />
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <LongInputWithPlaceholder
                            {...field}
                            id="confirmPassword"
                            placeholder="************"
                            type="password"
                            className={`w-full border-sec4 bg-primary9 rounded p-2 pl-10 ${
                                errors.confirmPassword ? "border-sec8" : ""
                            }`}
                        />
                    )}
                />
            </div>
            {errors.confirmPassword && (
                <span className="text-sec8">{errors.confirmPassword.message}</span>
            )}
        </div>
        
        <ButtonLongPurple
          type="submit"
          className="mt-4 text-center"
          disabled={isLoading ? true : false}
        >
          {isLoading ? "Processing.." : "Next"}
        </ButtonLongPurple>
      </form>
    </div>
  );
};

export default BasicInfo;
