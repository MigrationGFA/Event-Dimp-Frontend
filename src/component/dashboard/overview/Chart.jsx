import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const Charts = ({ overviewDetails }) => {
  const ecosystemType = useSelector((state) => state.ecosystemType.type);

  // Extracting data from overviewDetails
  const totalMonthlyIncome = overviewDetails.totalGifts || overviewDetails.totalAttendees || 0;

  // Safely accessing tickets per week with default values
  const weeklyIncome = {
    "Week 1": overviewDetails.ticketsPerWeek?.["Week 1"] || overviewDetails.giftsPerWeek?.["Week 1"] || 0,
    "Week 2": overviewDetails.ticketsPerWeek?.["Week 2"] || overviewDetails.giftsPerWeek?.["Week 2"] || 0,
    "Week 3": overviewDetails.ticketsPerWeek?.["Week 3"] || overviewDetails.giftsPerWeek?.["Week 3"] || 0,
    "Week 4": overviewDetails.ticketsPerWeek?.["Week 4"] || overviewDetails.giftsPerWeek?.["Week 4"] || 0,
    "Week 5": 0, // Assuming no data for Week 5
  };

  const totalMonthlyBookings = overviewDetails.totalAttendees || 0;
  const bookings = [
    { week: "Week 1", totalBookings: overviewDetails.attendeesThisMonth?.["Week 1"] || 0 },
    { week: "Week 2", totalBookings: overviewDetails.attendeesThisMonth?.["Week 2"] || 0 },
    { week: "Week 3", totalBookings: overviewDetails.attendeesThisMonth?.["Week 3"] || 0 },
    { week: "Week 4", totalBookings: overviewDetails.attendeesThisMonth?.["Week 4"] || 0 },
  ];

  // Pie Chart Data
  const pieData = bookings.map((week) =>
    week.totalBookings === 0 ? 0.01 : week.totalBookings
  );
  const pieLabels = bookings.map((week) => week.week);

  const pieOptions = {
    chart: { type: "donut" },
    labels: pieLabels,
    colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
    legend: { show: false, position: "bottom" },
    title: {
      align: "center",
      style: { fontSize: "12px", fontWeight: "bold" },
    },
    plotOptions: {
      pie: {
        donut: { size: "65%" },
        minAngleToShow: 1,
      },
    },
  };

  // Bar Chart Data
  const barData = [
    {
      name: "Weekly Income",
      data: [
        weeklyIncome["Week 1"],
        weeklyIncome["Week 2"],
        weeklyIncome["Week 3"],
        weeklyIncome["Week 4"],
        weeklyIncome["Week 5"],
      ],
    },
  ];

  const barOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    responsive: [
      {
        breakpoint: 480,
        options: { legend: { show: false } },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
        dataLabels: { total: { enabled: false } },
      },
    },
    xaxis: {
      type: "category",
      categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    },
    legend: { show: false },
    fill: { opacity: 1 },
    colors: ["#568CEF", "#46BCF9", "#F0E8E8"],
    stroke: { show: false },
  };

  return (
    <div className="lg:flex gap-3 lg:w-6/12 mb-3 w-full lg:px-2">
      {/* Bar Chart */}
      <div className="w-full p-4 bg-primary1 rounded-xl shadow-lg lg:w-6/12 h-auto">
        <h3 className="text-sm font-semibold">
          {totalMonthlyIncome} All time total {ecosystemType}
        </h3>
        <Chart
          options={barOptions}
          series={barData}
          type="bar"
          width="100%"
          height="100%"
        />
      </div>

      {/* Pie Chart */}
      <div
        className={`w-full p-4 bg-primary1 rounded-xl shadow-lg ${
          true ? "lg:w-6/12" : "lg:w-full"
        } mb-5 lg:mb-0`}
      >
        <h3 className="text-sm font-semibold">
          {totalMonthlyBookings} All time Attendees
        </h3>
        <Chart
          options={pieOptions}
          series={pieData}
          type="donut"
          width="100%"
        />
      </div>
    </div>
  );
};

export default Charts;