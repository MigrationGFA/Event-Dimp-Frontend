import React from "react";

const RecentPayments = () => {
  const payments = [
    { name: "Ajibade's Family", amount: "N150,000 cash" },
    { name: "Tunik Furniture", amount: "N500,000 cash" },
    { name: "Good Women", amount: "N800,000 cash" },
    { name: "Deliver Chapel", amount: "N50,000 cash" },
    { name: "Good Women", amount: "N200,000 cash" },
  ];

  return (
    <div className="p-5 bg-primary1 shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Names</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index} className="border-b">
              <td className="py-3">{payment.name}</td>
              <td className="py-2 text-ter11 text-right">{payment.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 text-primary11 items-center justify-center flex mx-auto font-medium border border-primary11 rounded py-2 px-4 hover:bg-primary11 hover:text-white transition">
        View Gift History
      </button>
    </div>
  );
};

export default RecentPayments;