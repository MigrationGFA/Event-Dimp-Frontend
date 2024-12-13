import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ShortInputWithPlaceholder } from "../../../component/Inputs";
import { Text, Heading } from "../../../component/Text";
import { useSelector } from "react-redux";
import { showToast } from "../../../component/ShowToast";
import api from "../../../api/authApis";

const EmailVerification = ({ nextStep }) => {
  const {
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();
  const inputRefs = useRef([]);
  const creatorEmail = useSelector(
    (state) => state.auth.user?.email || "UNKNOWN"
  );

  const creatorPhoneNumber = useSelector(
    (state) => state.auth.user?.phoneNumber || "UNKNOWN"
  );
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const timerRef = useRef(null);

  const resetTimer = () => {
    // Reset the timer
    setIsButtonDisabled(true);
    setSeconds(60);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Start a new countdown
    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          setIsButtonDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 60000);
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await api.creatorResendVerifyToken({
        email: creatorEmail,
        phoneNumber: creatorPhoneNumber,
      });
      showToast(response.data.message, "success");
      resetTimer();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast("OTP Resend failed", "error");
    }
  };

  useEffect(() => {
    resetTimer(); // Initialize the timer on mount

    return () => {
      // Clear the timer when the component unmounts
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);


  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only numeric input or empty (for backspace)
    if (/^[0-9]$/.test(value)) {
      setValue(`otp[${index}]`, value);
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
      trigger();
    } else if (value === "") {
      // If the input is cleared, just update the value
      setValue(`otp[${index}]`, "");
      trigger();
    } else {
      // Prevent any non-numeric input
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
        nextStep();
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [nextStep, isFormComplete]);

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
      const response = await api.creatorVerifyToken({
        email: creatorEmail,
        OTP: otp,
      });
      showToast(response.data.message, "success");
      setLoading(false);
      nextStep();
    } catch (error) {
      setLoading(false);
      showToast("OTP Verification failed", "error");
    }
  };

 

  useEffect(() => {
    setIsButtonDisabled(true);

    // Start the countdown timer
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsButtonDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="flex flex-col lg:w-10/12 mx-2">
      

      <div className="flex lg:space-x-8 space-x-2 mb-4">
        {new Array(6).fill("").map((_, index) => (
          <ShortInputWithPlaceholder
            key={index}
            placeholder="0"
            maxLength="1"
            className={`w-2/12 h-16 border ${
              errors.otp && errors.otp[index]
                ? "border-red-500"
                : "border-gray-400"
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
        <div>
          <button
            onClick={handleResendOTP}
            className={`text-primary3 font-body text-sm ${
              isButtonDisabled ? "opacity-65" : "opacity-100"
            }`}
            disabled={isButtonDisabled}
          >
            Resend OTP
          </button>
          <p>
            {isButtonDisabled && (
              <p className="text-sec8"> Resend otp in {seconds} seconds</p>
            )}
          </p>
        </div>
      </div>

      <button
        onClick={submit}
        disabled={!isFormComplete() || loading}
        className={`w-full bg-primary3 text-primary1 font-body py-3 px-4 rounded-lg ${
          isFormComplete() ? "" : "opacity-50 cursor-not-allowed"
        }`}
      >
        {loading ? "Processing..." : "Verify Account"}
      </button>
    </div>
  );
};

export default EmailVerification;
