import React from "react";
import Chart from "react-apexcharts";
import GiftIcon from "../../../assets/GiftIcon.svg";
import { Heading } from "../../Text";

const TicketsSummary = () => {
  const ticketsToday = 50;
  const totalTickets = 100;

  const completedTickets = {
    monday: 10,
    tuesday: 8,
    wednesday: 6,
    thursday: 7,
    friday: 5,
    saturday: 4,
    sunday: 0,
    total: 40,
  };

  const pendingTickets = {
    monday: 2,
    tuesday: 3,
    wednesday: 2,
    thursday: 1,
    friday: 1,
    saturday: 1,
    sunday: 0,
    total: 10,
  };

  const ticketsTodayOptions = {
    chart: {
      type: "radialBar",
      offsetY: 10,
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#4CAF50"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 10,
          size: "50%",
        },
        dataLabels: {
          show: false,
        },
      },
    },
    fill: {
      colors: ["#4CAF50"],
    },
    stroke: {
      lineCap: "round",
    },
  };

  const ticketsTodaySeries = [ticketsToday]; // Total tickets today

  // Abbreviate day names
  const abbreviatedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const ticketsThisWeekOptions = {
    chart: {
      type: "bar",
      height: 250,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        distributed: true,
      },
    },
    colors: [
      "#00BFFF",
      "#00FF7F",
      "#FF7F50",
      "#FFD700",
      "#8A2BE2",
      "#FF1493",
      "#7FFF00",
    ],
    xaxis: {
      categories: abbreviatedDays,
      labels: {
        style: { fontSize: "12px", fontWeight: 600 },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val}`,
      },
    },
    grid: { show: true },
    legend: { show: false },
  };

  const ticketsThisWeekSeries = [
    {
      name: "Tickets",
      data: [
        completedTickets.monday + pendingTickets.monday,
        completedTickets.tuesday + pendingTickets.tuesday,
        completedTickets.wednesday + pendingTickets.wednesday,
        completedTickets.thursday + pendingTickets.thursday,
        completedTickets.friday + pendingTickets.friday,
        completedTickets.saturday + pendingTickets.saturday,
        completedTickets.sunday + pendingTickets.sunday,
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
      {/* Tickets Today */}
      <div className="bg-white shadow-lg rounded-lg p-5 grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="space-y-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#F5F5F5]">
            <img src={GiftIcon} alt="Ticket Icon" className="w-10 h-10" />
          </div>
          <Heading level={1} className="text-xl font-semibold">
            Tickets Today
          </Heading>
          <div className="mt-2 space-y-1">
            <span className="text-sm text-gray-500 flex items-center space-x-1">
              <span>{completedTickets.total}</span>
              <div className="bg-green-500 w-4 h-4 rounded-sm"></div>
              <span>Completed</span>
            </span>
            <span className="text-sm text-gray-500 flex items-center space-x-1">
              <span>{pendingTickets.total}</span>
              <div className="bg-yellow-500 w-4 h-4 rounded-sm"></div>
              <span>Pending</span>
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="relative">
            <Chart
              options={ticketsTodayOptions}
              series={ticketsTodaySeries}
              type="radialBar"
              height={150}
            />
            <span className="text-3xl font-bold absolute inset-0 flex items-center justify-center">
              {ticketsToday}
            </span>
          </div>
        </div>
      </div>

      {/* Tickets This Week */}
      <div className="bg-white shadow-lg rounded-lg p-5 grid grid-cols-1 md:grid-cols-2 ">
        <div className="items-center justify-between mb-4 space-x-1 space-y-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#F5F5F5]">
            <img src={GiftIcon} alt="Ticket Icon" className="w-10 h-10" />
          </div>
          <Heading level={1} className="text-xl font-semibold mt-5 ">
            76 Tickets This Week
          </Heading>
        </div>
        <Chart
          options={ticketsThisWeekOptions}
          series={ticketsThisWeekSeries}
          type="bar"
          height={150}
        />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-5 flex items-center justify-between">
        <div className="items-center mb-2 space-x-1 justify-between h-full">
          <div className="w-14 h-14 flex items-center justify-center rounded-xl mt-1 bg-[#F5F5F5]">
            <img src={GiftIcon} alt="Ticket Icon" className="w-10 h-10" />
          </div>
          <Heading level={3} className="text-xl font-semibold mt-4">
            Total Tickets
          </Heading>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 border-[8px] border-gray-300 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">{totalTickets}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsSummary;
