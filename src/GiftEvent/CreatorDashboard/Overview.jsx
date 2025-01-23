import React, { useEffect, useState } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import Welcome from "../../component/dashboard/overview/WelcomeBack";
import Charts from "../../component/dashboard/overview/Chart";
import RecentAttendees from "../../component/dashboard/overview/RecentAttendee";
import WalletOverview from "../../component/dashboard/overview/WalletOverview";
import RecentPayments from "../../component/dashboard/overview/RecentPayments";
import AttendeeActivities from "../../component/dashboard/overview/AttendeeActivities";
import api from "../../api/DashboardApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AttendeeManagement from "../../component/dashboard/Attendees/AttendeeManagement";

const Overview = () => {
  const [overviewDetails, setOverviewDetails] = useState([]);
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    getCreatorOverview();
  }, [accessToken, refreshToken, ecosystemDomain]);

  const getCreatorOverview = async () => {
    try {
      const response = await api.creatorGiftAndTicketOverview({
        ecosystemDomain,
        refreshToken,
        accessToken,
      });
      console.log(response.data);
      setOverviewDetails(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <CreatorDashboardLayout>
      <div className="flex flex-col lg:flex-row justify-between lg:w-full gap-5 overflow-x-hidden overflow-y-hidden my-5 mx-3 lg:mx-0 px-2">
        <Welcome overviewDetails={overviewDetails} />
        <Charts overviewDetails={overviewDetails}/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 lg:mx-0">
        <RecentAttendees overviewDetails={overviewDetails}/>
        <WalletOverview overviewDetails={overviewDetails}/>
        <RecentPayments overviewDetails={overviewDetails}/>
      </div>

      {/* Bottom Section */}
      <div className="mx-4 lg:mx-0">
        <AttendeeManagement />
      </div>
    </CreatorDashboardLayout>
  );
};

export default Overview;
