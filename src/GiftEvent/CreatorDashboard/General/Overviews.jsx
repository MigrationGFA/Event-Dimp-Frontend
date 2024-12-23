import React, { useEffect, useState } from "react";
import CreatorDashboardLayout from "../../../layout/Creator/CreatorDashboardLayout";
import Welcome from "../../../component/dashboard/General/overview/WelcomeBack";
import Charts from "../../../component/dashboard/General/overview/Chart";
import MyCalendar from "../../../component/dashboard/General/overview/calendar";
import RecentBookings from "../../../component/dashboard/General/overview/RecentBooking";
import WebsitesDetails from "../../../component/dashboard/General/overview/WebsiteDetails";
import RecentActivities from "../../../component/dashboard/General/overview/RecentActivities";
// import api from "../../../api/DashboardApi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [earnings, setEarnings] = useState(null);
  const [bookingsByDate, setBookingsByDate] = useState(null);
  const [monthlyBooking, setMonthlyBooking] = useState(null);
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [errorBookingsByDate, setErrorBookingsByDate] = useState(null);
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  );
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // getBookingActivities();
    // getEarnings();
    //getMonthlyBooking();
    // getMonthlyIncome();

    // if (date) {
    //   getBookingDetailsByDate(date);
    // }
  }, [date]);

  const handleDateChange = (newDate) => {
    // Format the date in "10 Oct 2024" format before passing it
    const formattedDate = new Date(newDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    setDate(formattedDate);
  };

//   const getBookingActivities = async () => {
//     try {
//       const response = await api.creatorBookingActivities({
//         ecosystemDomain,
//         accessToken,
//         refreshToken,
//         dispatch,
//         navigate,
//       });
//       setBookingDetails(response.data);
//     } catch (error) {
//       console.error("Could not get booking activities:", error);
//     }
//   };

//   const getEarnings = async () => {
//     try {
//       const response = await api.creatorEarning({
//         ecosystemDomain,
//         accessToken,
//         refreshToken,
//         dispatch,
//         navigate,
//       });
//       setEarnings(response.data);
//     } catch (error) {
//       console.error("Could not get earnings:", error);
//     }
//   };

//   const getMonthlyBooking = async () => {
//     try {
//       const response = await api.creatorMonthlyBooking({
//         ecosystemDomain,
//         accessToken,
//         refreshToken,
//         dispatch,
//         navigate,
//       });
//       setMonthlyBooking(response.data);
//     } catch (error) {
//       console.error("Could not get earnings:", error);
//     }
//   };

//   const getMonthlyIncome = async () => {
//     try {
//       const response = await api.creatorMonthlyIncome({
//         ecosystemDomain,
//         accessToken,
//         refreshToken,
//         dispatch,
//         navigate,
//       });
//       setMonthlyIncome(response.data);
//     } catch (error) {
//       console.error("Could not get earnings:", error);
//     }
//   };

//   const getBookingDetailsByDate = async (formattedDate) => {
//     setIsBookingLoading(true);
//     try {
//       const response = await api.creatorBookingDate({
//         ecosystemDomain,
//         date: formattedDate,
//         accessToken,
//         refreshToken,
//         dispatch,
//         navigate,
//       });
//       setBookingsByDate(response.data);
//       setErrorBookingsByDate(null);
//     } catch (error) {
//       console.error("Could not get booking details by date:", error);
//       setErrorBookingsByDate(
//         error?.response?.data?.message || "No bookings found for this date"
//       );
//     } finally {
//       setIsBookingLoading(false);
//     }
//   };

  return (
    <CreatorDashboardLayout>
      <div className="flex flex-col lg:flex-row justify-between lg:w-full gap-5 overflow-x-hidden overflow-y-hidden my-5 mx-3 lg:mx-0 px-2">
        <Welcome earnings={earnings} bookingDetails={bookingDetails} />
        <Charts monthlyBooking={monthlyBooking} monthlyIncome={monthlyIncome} />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:w-full my-10 mx-4 lg:mx-0 px-2">
        <MyCalendar date={date} handleDateChange={handleDateChange} />
        <RecentBookings
          bookingsByDate={bookingsByDate}
          errorBookingsByDate={errorBookingsByDate}
          isBookingLoading={isBookingLoading}
        />
        <WebsitesDetails />
      </div>

      <div className="mx-4">
        <RecentActivities bookingDetails={bookingDetails} />
      </div>
    </CreatorDashboardLayout>
  );
};

export default Overview;
