import React from "react";
import Chart from "react-apexcharts";
import { Heading } from "../../Text";

const EventAttendance = () => {
  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Accepted Attendees ", "Rejected Attendees"],
    colors: ["#4CAF50", "#F44336"], // Green for accepted, Red for rejected
    stroke: {
      width: 2,
    },
    dataLabels: {
      enabled: false, // Disable labels inside the chart
    },
    legend: {
      position: "bottom", // Position the labels at the bottom
      horizontalAlign: "center", // Center-align the labels
      markers: {
        width: 12,
        height: 12,
        radius: 6, // Rounded markers
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
  };

  const chartSeries = [70, 30]; // Example data: 70% accepted, 30% rejected

  return (
    <div className="bg-sec12 shadow rounded-lg p-5 mb-5">
      <Heading level={3} className="text-lg font-semibold mb-4 text-center md:text-left">
        Event Attendance
      </Heading>
      <div className="flex flex-wrap justify-center md:justify-start">
        <div className="relative w-full sm:w-auto">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="donut"
            width="100%" // Adjust width dynamically
          />
          <p className="absolute top-1/2 transform -translate-y-2/3 w-5/12 mx-auto inset-0 flex items-center justify-center text-center font-medium lg:text-sm text-[12px] text-gray-800">
            Expected Attendees: 20,000
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventAttendance;
