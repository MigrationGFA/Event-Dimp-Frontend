import React from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import { Heading, Text } from "../../component/Text";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import EventAttendance from "../../component/dashboard/Attendees/EventAttendees";
import FoodAndDrinksPreferences from "../../component/dashboard/Attendees/FoodAndDrinkPreference";
import RecentlyRegistered from "../../component/dashboard/Attendees/RecentlyRegistered";
import AttendeeManagement from "../../component/dashboard/Attendees/AttendeeManagement";

const Attendees = () => {
  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-7 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
          Attendees
        </Heading>
        <Text className="font-medium  text-primary4">
          You have 10 newly registered attendees
        </Text>

        <img
          src={EditTemplateImage}
          alt=""
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 lg:mx-0 mt-6">
        <EventAttendance />
        <FoodAndDrinksPreferences />
        <RecentlyRegistered />
      </div>

      <div className="mx-4 lg:mx-0">
        <AttendeeManagement />
      </div>
    </CreatorDashboardLayout>
  );
};

export default Attendees;
