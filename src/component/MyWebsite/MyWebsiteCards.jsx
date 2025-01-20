import React from "react";
import TotalTodayImg from "../../assets/Withdrawallogo.svg";
import { Text } from "../Text";
import { useNavigate } from "react-router-dom";

const MyWebsiteCards = ({websites}) => {
  const navigate = useNavigate();
  const totalWebsites = websites?.ecosystems?.length;

  const handleCreateWebsite = () => {
    navigate("/auth/personal-Information/new");
  };


  return (
    <div className="mt-5">
      {/* Card Container */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Websites Created Card */}
        <div className="bg-[#F3EFFF] p-6 rounded-lg flex items-center justify-between shadow-lg border border-purple-300">
          <Text className="text-center font-semibold text-lg mt-4">
            Total Website Created
          </Text>
          <div className="relative lg:w-24 lg:h-24 w-20 h-20">
            {/* Circular Progress */}
            <div className="absolute inset-0 rounded-full border-[8px] border-green-500 border-t-orange-400"></div>
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-green-600">
              {totalWebsites}
            </div>
          </div>
        </div>

        {/* Create New Website Card */}
        <button
          className="bg-[#EDF9DE] p-6 rounded-lg flex items-center justify-between shadow-lg border border-green-400"
          onClick={handleCreateWebsite}
        >
          <Text className="font-semibold text-xl">Create new Website</Text>
          <div className="bg-[#D6F5C5] w-10 h-10 flex items-center justify-center rounded-full">
            <img src={TotalTodayImg} alt="Create Icon" />
          </div>
        </button>

        {/* View All Websites Card */}
        {/* <button
          className="bg-[#FFF6D9] p-6 rounded-lg flex items-center justify-between shadow-lg border border-yellow-400"
          onClick={handleAllWebsite}
        >
          <Text className="font-semibold text-xl">View all website</Text>
          <div className="bg-[#FCEECB] w-10 h-10 flex items-center justify-center rounded-full">
            <img src={TotalTodayImg} alt="View Icon" />
          </div>
        </button> */}
      </div>
    </div>
  );
};

export default MyWebsiteCards;
