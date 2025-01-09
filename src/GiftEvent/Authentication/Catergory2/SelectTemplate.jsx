
import React, { useEffect, useState } from "react";
import templates from "../../../component/Templates";
import { Heading, Text } from "../../../component/Text";
import { ButtonSmallPurple } from "../../../component/Buttons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const groupByCategory = (templates) => {
  return templates.reduce((acc, template) => {
    const { category } = template;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(template);
    return acc;
  }, {});
};

const SelectTemplate = ({ nextStep, currentStep }) => {
  const steps = [0, 1];
  const navigate = useNavigate();
  const [subCategory, setSubCategory] = useState(null);
  const userStep = useSelector((state) => state.auth?.user?.step);

  useEffect(() => {
    const storedSubCategory = sessionStorage.getItem("subCategory")?.trim();
    setSubCategory(storedSubCategory || "Event Planning");
    if (userStep === 5 || userStep === 4 || userStep === 3)
      navigate("/auth/login");
  }, [userStep, navigate]);


  const handleSubmit = (id) => {
    sessionStorage.setItem("templateId", id);
    nextStep();
  };


  // Filter templates based on subCategory
  const filteredTemplates = subCategory
  ? templates.filter(
      (template) =>
        template.category.trim().toLowerCase() === subCategory.trim().toLowerCase()
    )
  : templates;


  const groupedTemplates = groupByCategory(filteredTemplates);

  return (
    <div className="h-screen pb-20">
      {/* Stepper */}
      <div className="flex items-center justify-center my-6 ">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`transition-all duration-500 ease-in-out h-2 rounded-full 
            ${
              currentStep === step ? "w-8/12 bg-primary3" : "w-4/12 bg-gray-300"
            } 
            ${index < steps.length - 1 ? "mr-4" : ""}`}
          />
        ))}
      </div>

      <div className="space-y-8 overflow-y-auto mt-10 h-full pb-36">
        {/* Blank Template Button */}
        <div className="justify-end flex">
          <ButtonSmallPurple
            width="w-auto"
            onClick={() => handleSubmit(15)}
          >
            Select Blank Template
          </ButtonSmallPurple>
        </div>
        
        {Object.entries(groupedTemplates).map(
          ([category, categoryTemplates]) => (
            <div key={category}>
              <Heading
                level={2}
                size="lg"
                className="text-xl mb-4"
                color="primary8"
              >
                {category} Templates
              </Heading>
              <Text className="text-[16px]" color="gray-500">
                Choose a template suitable for {category} websites
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 whitespace-nowrap">
                {categoryTemplates.map((template, index) => (
                  <div
                    key={index}
                    className="inline-block border rounded-lg overflow-hidden shadow-lg"
                  >
                    <img
                      src={template.image}
                      alt={template.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <Heading
                        level={3}
                        size="lg"
                        className="text-[20px]"
                        color="primary8"
                      >
                        {template.title}
                      </Heading>
                      <Text className="text-[16px]" color="primary8">
                        {template.description}
                      </Text>
                      <ButtonSmallPurple
                        width="40px"
                        className="mt-2 px-4 py-2 bg-primary3 text-white rounded"
                        onClick={() => handleSubmit(template.id)}
                      >
                        Select
                      </ButtonSmallPurple>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SelectTemplate;
