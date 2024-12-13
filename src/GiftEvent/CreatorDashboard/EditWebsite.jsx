import React from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { Heading } from "../../component/Text";
import { ButtonSmallPurple, ButtonSmallWhite } from "../../component/Buttons";

const EditWebsite = () => {
  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
          Manage Website
        </Heading>
        <img
          src={EditTemplateImage}
          alt="Edit Template"
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>
      <div className="flex space-x-4 w-full mt-6 items-center justify-center lg:justify-end lg:w-full">
        <ButtonSmallWhite
          width="80px"
          padding="1"
          className="text-sm lg:text-lg px-2"
        >
          Discard Changes
        </ButtonSmallWhite>
        <ButtonSmallPurple
          width="80px"
          //disabled={loading || cloading}
          padding="1"
          //onClick={handleSubmit}
          className="text-sm lg:text-lg px-2"
        >
          {/* {loading ? "Saving Changes" : " */}
          Save Changes
          {/* "} */}
        </ButtonSmallPurple>
      </div>
    </CreatorDashboardLayout>
  );
};

export default EditWebsite;
