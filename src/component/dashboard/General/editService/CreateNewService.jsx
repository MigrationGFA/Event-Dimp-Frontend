import React, { useRef } from "react";
import CreatorDashboardLayout from "../../../layout/Creator/CreatorDashboardLayout";
import EditTemplateImage from "../../../assets/EditTemplate.svg";
import { Heading, Text } from "../../../component/Text";
import NewServiceForm from "./NewServiceForm";

const CreateNewService = () => {
  
  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body shadow-lg">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div>
            <Heading className="font-semibold text-[26px] text-primary4">
              Add New Service
            </Heading>
            <Text>Kindly enter the details of service you want to create</Text>
          </div>
          <img
            src={EditTemplateImage}
            alt="Edit template"
            className="w-32 pr-6 right-0 bottom-0 absolute"
          />
        </div>
      </div>
      <NewServiceForm />
    </CreatorDashboardLayout>
  );
};

export default CreateNewService;
