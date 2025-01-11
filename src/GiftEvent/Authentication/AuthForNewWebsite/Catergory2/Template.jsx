import React, { useState } from "react";
import SelectTemplate from "./SelectTemplate";
import EditTemplate from "./EditTemplate";
import RegistrationLayout from "../../../../layout/Creator/RegistrationLayout";
import SelectTemplateImage from "../../../../assets/SelectTemplate.svg";
import EditTemplateImage from "../../../../assets/EditTemplate.svg";
import { Text, Heading } from "../../../../component/Text";

// Illustration images for different steps
const illustrations = [SelectTemplateImage, EditTemplateImage];

const Template = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState([false, false]);

  const nextStep = () => {
    if (currentStep < 1) {
      setIsCompleted((prev) => {
        const updated = [...prev];
        updated[currentStep] = true;
        return updated;
      });
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <SelectTemplate
            nextStep={nextStep}
            currentStep={currentStep}
            isCompleted={isCompleted}
          />
        );
      case 1:
        return (
          <EditTemplate
            nextStep={nextStep}
            prevStep={prevStep}
            currentStep={currentStep}
            isCompleted={isCompleted}
          />
        );
      default:
        return null;
    }
  };

  return (
    <RegistrationLayout>
      <div className="lg:mx-16 flex-wrap mx-4 my-4 lg:mt-10 lg:mb-20 h-full ">
        <div className="bg-sec1 flex justify-between rounded-xl relative p-6">
          <div className="flex flex-col text-left">
            {/* Replace h2 with Heading component */}
            <Heading
              level={2}
              size="2xl"
              weight="font-semibold"
              color="primary4"
            >
              {currentStep === 0 ? "Select Website Design" : "Review Website Context"}
            </Heading>

            {/* Replace p with Text component */}
            <Text color="gray-600" className="text-left text-[12px]">
              {currentStep === 0
                ? "Select and preview your preferred templates"
                : "Preview your selected template"}
            </Text>
          </div>

          <img
            src={illustrations[currentStep]}
            alt={currentStep === 0 ? "Select Template" : "Preview Template"}
            className="w-28 pr-6 right-0 bottom-0 absolute"
          />
        </div>
        <div className="w-12/12">

        {renderStepContent()}
        </div>
      </div>
    </RegistrationLayout>
  );
};

export default Template;
