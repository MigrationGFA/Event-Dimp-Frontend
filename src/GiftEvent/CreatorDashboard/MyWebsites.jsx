
import React from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import { Heading, Text } from "../../component/Text";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import MyWebsiteCards from "../../component/MyWebsite/MyWebsiteCards";
import RecentlyCreatedWebsites from "../../component/MyWebsite/RecentCreatedWebsite";

const MyWebsites = () => {
  return (
  <CreatorDashboardLayout>
<div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-7 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
         My Websites
        </Heading>
        <Text className="font-medium  text-primary4">
          You have created 2 websites
        </Text>

        <img
          src={EditTemplateImage}
          alt=""
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>
      <div className="mt-5 mx-4 lg:mx-0">
        <MyWebsiteCards />
      </div>

      <div>
        <RecentlyCreatedWebsites />
      </div>
  </CreatorDashboardLayout>
  );
};

export default MyWebsites;
