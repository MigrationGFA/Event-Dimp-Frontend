// import React from "react";
// import Chart from "react-apexcharts";
// import { Spinner } from "flowbite-react";
// import { useLocation } from "react-router-dom";

// const Charts = ({ monthlyBooking, monthlyIncome }) => {
//   const location = useLocation();

//   // If the current path is '/creator/dashboard/booking', do not show the bar chart
//   const shouldShowBarChart = location.pathname !== "/creator/dashboard/booking";

//   // If the data is not available, display a loading spinner
//   if (!monthlyBooking || !monthlyBooking.bookings) {
//     return (
//       <div className="flex justify-center items-center">
//         <Spinner color="purple" aria-label="Purple spinner example" size="lg" />
//       </div>
//     );
//   }

//   const weeklyIncome = monthlyIncome?.weeklyIncome || {};

//   let pieData = "0,0,0,0,0"
//   //monthlyBooking.bookings.map((week) => week.totalBookings);
//   pieData = pieData.map((value) => (value === 0 ? 0.01 : value));

//   const pieOptions = {
//     chart: {
//       type: "donut",
//     },
//     labels: monthlyBooking.bookings.map((week) => week.week),
//     colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
//     legend: {
//       show: false,
//       position: "bottom",
//     },
//     title: {
//       text: `${monthlyBooking?.month || ""} Booking`,
//       align: "center",
//       style: {
//         fontSize: "12px",
//         fontWeight: "bold",
//       },
//     },
//     plotOptions: {
//       pie: {
//         donut: {
//           size: "65%",
//         },
//         minAngleToShow: 1,
//       },
//     },
//   };

//   const barOptions = {
//     chart: {
//       type: "bar",
//       height: 350,
//       stacked: true,
//       toolbar: {
//         show: false,
//       },
//       zoom: {
//         enabled: false,
//       },
//     },
//     title: {
//       text: `${monthlyIncome?.month || ""} Income`,
//       align: "center",
//       style: {
//         fontSize: "12px",
//         fontWeight: "bold",
//       },
//     },
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           legend: {
//             show: false,
//           },
//         },
//       },
//     ],
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         borderRadius: 5,
//         borderRadiusApplication: "end",
//         borderRadiusWhenStacked: "last",
//         dataLabels: {
//           total: {
//             enabled: false,
//             style: {
//               fontSize: "13px",
//               fontWeight: 900,
//             },
//           },
//         },
//       },
//     },
//     xaxis: {
//       type: "category",
//       categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
//     },
//     legend: {
//       show: false,
//     },
//     fill: {
//       opacity: 1,
//     },
//     colors: ["#568CEF", "#46BCF9", "#F0E8E8"],
//     stroke: {
//       show: false,
//     },
//   };

//   const barData = [
//     {
//       name: "Weekly Income",
//       data: [
//         weeklyIncome["Week 1"] || 0,
//         weeklyIncome["Week 2"] || 0,
//         weeklyIncome["Week 3"] || 0,
//         weeklyIncome["Week 4"] || 0,
//         weeklyIncome["Week 5"] || 0,
//       ],
//     },
//   ];

//   return (
//     <div className="lg:flex gap-3 lg:w-6/12 mb-3 w-full lg:px-2">
//       <div
//         className={`w-full p-4 bg-primary1 rounded-xl shadow-lg ${
//           shouldShowBarChart ? "lg:w-6/12" : "lg:w-full"
//         } mb-5 lg:mb-0`}
//       >
//         <h3 className="text-md font-semibold">
//           {monthlyBooking?.totalMonthlyBookings || 0} Bookings this month
//         </h3>
//         <Chart
//           options={pieOptions}
//           series={pieData}
//           type="donut"
//           width="100%"
//         />
//       </div>

//       {shouldShowBarChart && (
//         <div className="w-full p-4 bg-primary1 rounded-xl shadow-lg lg:w-6/12 h-auto">
//           <h3 className="text-md font-semibold">
//             {monthlyIncome?.totalMonthlyIncome || 0} Monthly Income
//           </h3>
//           <Chart
//             options={barOptions}
//             series={barData}
//             type="bar"
//             width="100%"
//             height="100%"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Charts;


import React from "react";
import Chart from "react-apexcharts";
import { Spinner } from "flowbite-react";
import { useLocation } from "react-router-dom";

const Charts = ({ monthlyBooking, monthlyIncome }) => {
  const location = useLocation();

  // If the current path is '/creator/dashboard/booking', do not show the bar chart
  const shouldShowBarChart = location.pathname !== "/creator/dashboard/general-booking";

  // Dummy data for fallback
  const dummyMonthlyBooking = {
    bookings: [
      { week: "Week 1", totalBookings: 10 },
      { week: "Week 2", totalBookings: 20 },
      { week: "Week 3", totalBookings: 15 },
      { week: "Week 4", totalBookings: 25 },
      { week: "Week 5", totalBookings: 5 },
    ],
    totalMonthlyBookings: 75,
    month: "July",
  };

  const dummyMonthlyIncome = {
    weeklyIncome: {
      "Week 1": 500,
      "Week 2": 700,
      "Week 3": 600,
      "Week 4": 800,
      "Week 5": 400,
    },
    totalMonthlyIncome: 3000,
    month: "July",
  };

  // Use dummy data if real data is not available
  const bookingData = monthlyBooking || dummyMonthlyBooking;
  const incomeData = monthlyIncome || dummyMonthlyIncome;

  // Pie chart data and options
  const pieData = bookingData.bookings.map((week) => week.totalBookings).map((value) => (value === 0 ? 0.01 : value));
  const pieOptions = {
    chart: {
      type: "donut",
    },
    labels: bookingData.bookings.map((week) => week.week),
    colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
    legend: {
      show: false,
      position: "bottom",
    },
    title: {
      text: `${bookingData?.month || ""} Booking`,
      align: "center",
      style: {
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
        minAngleToShow: 1,
      },
    },
  };

  // Bar chart data and options
  const barData = [
    {
      name: "Weekly Income",
      data: [
        incomeData.weeklyIncome["Week 1"] || 0,
        incomeData.weeklyIncome["Week 2"] || 0,
        incomeData.weeklyIncome["Week 3"] || 0,
        incomeData.weeklyIncome["Week 4"] || 0,
        incomeData.weeklyIncome["Week 5"] || 0,
      ],
    },
  ];
  const barOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: `${incomeData?.month || ""} Income`,
      align: "center",
      style: {
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        dataLabels: {
          total: {
            enabled: false,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: "category",
      categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    },
    legend: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
    colors: ["#568CEF", "#46BCF9", "#F0E8E8"],
    stroke: {
      show: false,
    },
  };

  return (
    <div className="lg:flex gap-3 lg:w-6/12 mb-3 w-full lg:px-2">
      <div
        className={`w-full p-4 bg-primary1 rounded-xl shadow-lg ${
          shouldShowBarChart ? "lg:w-6/12" : "lg:w-full"
        } mb-5 lg:mb-0`}
      >
        <h3 className="text-md font-semibold">
          {bookingData?.totalMonthlyBookings || 0} Bookings this month
        </h3>
        <Chart options={pieOptions} series={pieData} type="donut" width="100%" />
      </div>

      {shouldShowBarChart && (
        <div className="w-full p-4 bg-primary1 rounded-xl shadow-lg lg:w-6/12 h-auto">
          <h3 className="text-md font-semibold">
            {incomeData?.totalMonthlyIncome || 0} Monthly Income
          </h3>
          <Chart
            options={barOptions}
            series={barData}
            type="bar"
            width="100%"
            height="100%"
          />
        </div>
      )}
    </div>
  );
};

export default Charts;

