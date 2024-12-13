import React from "react";
import Chart from "react-apexcharts";
import { Heading, Text } from "../../Text";

const PaymentChart = ({ paymentCharts, allTimeBooking }) => {
  const currentYear = new Date().getFullYear();

  // Destructure data from allTimeBooking
  const { 
    allTimeTotalBookings = 0, 
    salesWithMonthNames: bookingSalesWithMonthNames = [] 
  } = allTimeBooking || {};

  const {
    salesWithMonthNames = [],
    percentageDifference = 0,
    lastMonthSales = 0,
  } = paymentCharts || {};
  
  
  const formattedPercentageDifference = percentageDifference.toFixed(1);

 
  const bookingMonths =
  bookingSalesWithMonthNames.length > 0
      ? bookingSalesWithMonthNames.map((sale) => sale.month.slice(0, 3))
      : ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];

  const totalBookings =
    bookingSalesWithMonthNames.length > 0
      ? bookingSalesWithMonthNames.map((sale) => sale.totalBookings)
      : [0, 0, 0, 0, 0, 0];

  // Ensure bookingMonths and totalBookings have matching lengths
  if (bookingMonths.length !== totalBookings.length) {
    console.error("Booking months and total bookings length mismatch");
  }

  // Extract the first three letters of each month name for line chart
  const monthNames =
    salesWithMonthNames.length > 0
      ? salesWithMonthNames.map((sale) => sale.month.slice(0, 3))
      : ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];

  const totalSales =
    salesWithMonthNames.length > 0
      ? salesWithMonthNames.map((sale) => sale.totalSales)
      : [0, 0, 0, 0, 0, 0];

  // Handle last month data safely
  const lastMonthIndex =
    salesWithMonthNames.length > 1 ? salesWithMonthNames.length - 2 : 0;
  const lastMonthData = salesWithMonthNames[lastMonthIndex] || {
    month: "Sep",
    totalSales: 0,
  };
  const lastMonthName = lastMonthData.month.slice(0, 3);
  const lastMonthSalesValue = lastMonthData.totalSales || 0;

  // Define line chart options
  const lineChartOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: monthNames,
    },
    annotations: {
      points: [
        {
          x: lastMonthName || "Sep",
          y: lastMonthSalesValue || 0,
          marker: {
            size: 6,
            fillColor: "#fff",
            strokeColor: "#2695F3",
            radius: 2,
          },
          label: {
            borderColor: "#2695F3",
            offsetY: 0,
            style: {
              color: "#fff",
              background: "#2695F3",
            },
            text: `${lastMonthSalesValue}: High sales in ${lastMonthName}`, 
          },
        },
      ],
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#2695F3"],
  };

  // Prepare line chart data
  const lineChartData = [
    {
      name: "Sales",
      data: totalSales,
    },
  ];

  // Bar chart options and data
  const barChartOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: bookingMonths,
      labels: {
        style: {
          fontSize: "14px",
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: false,
        columnWidth: "50%",
      },
    },
    grid: {
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "14px",
      },
    },
  };

  const barChartData = [
    {
      name: "Bookings",
      data: totalBookings,
    },
  ];

  return (
    <div className="lg:w-8/12 lg:flex lg:space-x-4 space-y-4 lg:space-y-0 mt-6 lg:mt-0">
      <div className="bg-primary1 p-6 rounded-lg shadow lg:w-1/2">
        <Heading level={2} weight="font-semibold" size="[18px]">
          Gifts this Week
        </Heading>
        <Chart
          options={lineChartOptions}
          series={lineChartData}
          type="line"
          height={200}
        />
        <Text className="text-sm flex items-center">
          <span className="font-bold text-2xl">{formattedPercentageDifference}%</span>{" "}
          <span className="ml-3">
            Your sales performance is {formattedPercentageDifference}%{" "}
            {formattedPercentageDifference > 0 ? "better" : "worse"} compared to last
            month
          </span>
        </Text>
      </div>

      <div className="bg-primary1 p-6 rounded-lg shadow lg:w-1/2">
        <Text size="4xl" weight="font-bold" className="text-primary10">
          {allTimeTotalBookings}
        </Text>
        <Text size="sm">All time Gifts</Text>
        <Chart
          options={barChartOptions}
          series={barChartData}
          type="bar"
          height={250}
        />
      </div>
    </div>
  );
};

export default PaymentChart;
