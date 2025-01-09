import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ShortInputWithPlaceholder } from "../../../component/Inputs";
import { Text, Heading } from "../../../component/Text";
import { useSelector } from "react-redux";
import { showToast } from "../../../component/ShowToast";
import api from "../../../api/authApis";
import EmailImg from "../../../assets/email-codeIMG.webp";

const EmailVerification = () => {
  const { email } = useParams();  
  const navigate = useNavigate();
  const {
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();
  const inputRefs = useRef([]);
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      setValue(`otp[${index}]`, value);
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
      trigger();
    } else if (value === "") {
      setValue(`otp[${index}]`, "");
      trigger();
    } else {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      newOtp.forEach((digit, index) => {
        setValue(`otp[${index}]`, digit);
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = digit;
        }
      });
      inputRefs.current[5]?.focus();
      trigger();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      setValue(`otp[${index}]`, "");
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = "";
      }
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
      trigger();
    }
  };

  const handleFocus = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].select();
    }
  };

  const isFormComplete = () => {
    const otpValues = new Array(6)
      .fill("")
      .map((_, index) => getValues(`otp[${index}]`));
    return otpValues.every((digit) => digit !== undefined && digit !== "");
  };

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter" && isFormComplete()) {
        e.preventDefault();
        submit();
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [isFormComplete]);

  const submit = async () => {
    setLoading(true);
    const otpArray = new Array(6)
      .fill("")
      .map((_, index) => getValues(`otp[${index}]`));
    const otp = otpArray.join("");

    if (!otp) {
      setLoading(false);
      showToast("Please fill all OTP fields", "error");
      return;
    }
    try {
      const response = await api.creatorResetPasswordOtp({
        email,
        OTP: otp, 
      });

      showToast(response.data.message, "success");
      navigate(`/creator/reset-password/${email}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast("OTP Verification failed", "error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-sec1">
      <div className="bg-primary1 shadow-lg rounded-lg flex w-11/12 md:w-10/12 lg:w-8/12 h-auto p-6 md:p-8">
        {/* Left Section */}
        <div className="w-1/2 hidden md:block p-4">
          <img src={EmailImg} alt="email code" />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <Heading
            level={2}
            className="text-left font-semibold mb-3"
            size="xl"
            color="primary4"
          >
            Enter Verification Code
          </Heading>
          <Text className="mb-16 text-left text-[12px]" color="primary8">
            Please check your email address for the verification code.
          </Text>

          <div className="flex justify-between mb-4 space-x-2">
            {new Array(6).fill("").map((_, index) => (
              <ShortInputWithPlaceholder
                key={index}
                placeholder="0"
                maxLength="1"
                className={`w-14 h-12 border ${
                  errors.otp && errors.otp[index]
                    ? "border-ter7"
                    : "border-sec2"
                } text-center text-lg focus:outline-none focus:border-primary3`}
                {...register(`otp[${index}]`, { required: true })}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : null}
                onFocus={() => handleFocus(index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>

          <div className="flex justify-end w-full mb-4">
            <button
              onClick={() => alert("Resend OTP clicked")}
              className="text-primary3 font-body text-sm"
            >
              Resend OTP
            </button>
          </div>

          <button
            onClick={submit}
            disabled={!isFormComplete() || loading}
            className={`w-full bg-primary3 text-primary1 font-body py-3 px-4 rounded-lg ${
              isFormComplete() ? "" : "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Processing..." : "Verify Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
