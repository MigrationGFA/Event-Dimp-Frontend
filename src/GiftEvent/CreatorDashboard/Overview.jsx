import React, { useEffect, useState } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import Welcome from "../../component/dashboard/overview/WelcomeBack";
import Charts from "../../component/dashboard/overview/Chart";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RecentAttendees from "../../component/dashboard/overview/RecentAttendee";
import WalletOverview from "../../component/dashboard/overview/WalletOverview";
import RecentPayments from "../../component/dashboard/overview/RecentPayments";
import AttendeeActivities from "../../component/dashboard/overview/AttendeeActivities";

const Overview = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [earnings, setEarnings] = useState(null);
  const [bookingsByDate, setBookingsByDate] = useState(null);
  const [monthlyBooking, setMonthlyBooking] = useState(null);
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <CreatorDashboardLayout>
      <div className="flex flex-col lg:flex-row justify-between lg:w-full gap-5 overflow-x-hidden overflow-y-hidden my-5 mx-3 lg:mx-0 px-2">
        <Welcome />
        <Charts  />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 lg:mx-0">
        <RecentAttendees />
        <WalletOverview />
        <RecentPayments />
      </div>

      {/* Bottom Section */}
      <div className="mx-4 lg:mx-0">
        <AttendeeActivities />
      </div>

      
    </CreatorDashboardLayout>
  );
};

export default Overview;
