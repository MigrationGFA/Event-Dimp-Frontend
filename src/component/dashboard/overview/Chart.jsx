import React from "react";
import Chart from "react-apexcharts";

const Charts = () => {
  // Dummy data for demonstration purposes
  const dummyMonthlyIncome = {
    totalMonthlyIncome: 15000,
   
    weeklyIncome: {
      "Week 1": 3000,
      "Week 2": 4000,
      "Week 3": 2500,
      "Week 4": 3500,
      "Week 5": 1000,
    },
  };

  const dummyMonthlyBooking = {
    totalMonthlyBookings: 20,
    bookings: [
      { week: "Mon", totalBookings: 5 },
      { week: "Tue", totalBookings: 6 },
      { week: "Wed", totalBookings: 4 },
      { week: "Thur", totalBookings: 5 },
    ],
  };

  // Pie Chart Data
  const pieData = dummyMonthlyBooking.bookings.map((week) =>
    week.totalBookings === 0 ? 0.01 : week.totalBookings
  );
  const pieLabels = dummyMonthlyBooking.bookings.map((week) => week.week);

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
        dummyMonthlyIncome.weeklyIncome["Week 1"],
        dummyMonthlyIncome.weeklyIncome["Week 2"],
        dummyMonthlyIncome.weeklyIncome["Week 3"],
        dummyMonthlyIncome.weeklyIncome["Week 4"],
        dummyMonthlyIncome.weeklyIncome["Week 5"],
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
          {dummyMonthlyIncome.totalMonthlyIncome || 0} All time total Gifts
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
          {dummyMonthlyBooking.totalMonthlyBookings || 0} All time Attendees
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
