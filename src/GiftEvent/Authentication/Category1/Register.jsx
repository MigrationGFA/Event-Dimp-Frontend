import React, { useState, useEffect } from "react";
import RegistrationLayout from "../../../layout/Creator/RegistrationLayout";
import BasicInfo from "./BasicInfo";
import EmailVerification from "./EmailVerification";
import BusinessInfo from "./BusinessInfo";
import { Heading, Text } from "../../../component/Text";
import LoginModal from "../../../component/Modal/LoginModal";
import IllustrationImage from "../../../assets/Group.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

   const toCamelCase = (str) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => ` ${char.toUpperCase()}`)
      .trim(); // Remove any leading or trailing spaces
  };
  

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBasicInfoResponse = (response) => {
    console.log("this is res res", response);
    if (response === "Email address is associated with an account" ) {
      setIsLoginModalOpen(true);
    } else if (response ==="Internal Server Error"){
navigate("/auth/personal-Information");
    } else{
      nextStep();
    }
  };

  const steps = [
    {
      title: "Basic Information",
      subTitle: "Kindly fill in your basic information",
      component: (
        <BasicInfo
          nextStep={nextStep}
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          handleResponse={handleBasicInfoResponse}
        />
      ),
    },
    {
      title: "Email Verification",
      subTitle: " Please check your phone message or email address for your verification code",
      component: <EmailVerification nextStep={nextStep} prevStep={prevStep} />,
    },
    {
      title: "Business Information",
      subTitle: "Kindly fill in your business details",
      component: <BusinessInfo prevStep={prevStep} />,
    },
  ];

  return (
    <RegistrationLayout>
      {/* Display LoginModal if the email is associated with an account */}
      {isLoginModalOpen && (
        <LoginModal
          setCurrentStep={setCurrentStep}
          closeModal={() => setIsLoginModalOpen(false)}
          isLoginModalOpen={isLoginModalOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}
        />
      )}
      {/* Active Step Title */}
      <div className="flex w-full">
        <div className=" w-full lg:w-9/12 p-4 lg:p-12">
          {steps[currentStep] && (
            <div className="text-center mb-4">
              <Heading
                level={2}
                size="lg"
                color="black"
                className="text-left font-normal font-Outfit"
              >
                {steps[currentStep].title.toUpperCase()}
              </Heading>
              <Text
                size="sm"
                color="black"
                className="text-left text-primary5 font-normal font-Outfit"
              >
                {toCamelCase(steps[currentStep]?.subTitle)}
              </Text>
            </div>
          )}

          {/* Stepper with dynamic width for active and inactive steps */}
          <div className="">
            <div className="flex mb-6">
              {steps.map((_, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <div
                    key={index}
                    className={`transition-all duration-500 ease-in-out h-2 rounded-full
                    ${isActive ? "w-6/12 bg-primary3" : "w-3/12 bg-gray-300"} 
                    ${isCompleted ? "bg-sec5" : ""} 
                    ${index < steps.length - 1 ? "mr-4" : ""}`}
                  />
                );
              })}
            </div>
          </div>
          {/* <div> {steps[currentStep].component}  </div> */}
          <div>
            {steps[currentStep] ? (
              steps[currentStep].component
            ) : (
              <p>Loading...</p> // You can show a fallback message or component
            )}
          </div>
        </div>

        <div className="w-3/12 bg-[#F4F1FF] h-screen hidden  lg:flex justify-center items-center">
          <img src={IllustrationImage} alt="Illustration" />
        </div>
      </div>
    </RegistrationLayout>
  );
};

export default Register;
