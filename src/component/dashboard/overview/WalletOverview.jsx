import React from "react";
import Chart from "react-apexcharts";

const WalletOverview = () => {
  const chartData = {
    series: [70, 30],
    options: {
      chart: { type: "donut" },
      colors: ["#FFA500", "#6C63FF"],
      dataLabels: {
        enabled: false, // Disable data labels
      },
      legend: {
        show: false, // Optionally hide the legend if you don't want it
      },
    },
  };

  return (
    <div className="p-5 bg-white shadow rounded-lg relative">
      <h3 className="text-lg font-semibold mb-4">Wallet Overview</h3>
      <div className="relative">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          width="100%"
        />
        <p className="absolute inset-0 flex items-center justify-center text-center font-medium text-sm text-gray-800 top-1/2 transform -translate-y-1/2 w-6/12 mx-auto">
          Total Wallet Balance: N500,000
        </p>
      </div>
      <button className="mt-4 px-4 py-2 border  hover:bg-primary3 hover:text-white transition border-primary3 items-center mx-auto justify-center flex rounded-xl w-9/12 font-medium">
        View Wallet
      </button>
    </div>
  );
};

export default WalletOverview;
