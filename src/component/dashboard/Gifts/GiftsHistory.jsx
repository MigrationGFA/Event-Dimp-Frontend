import React from "react";

const GiftsHistory = () => {
  const gifts = [
    { id: "#001", name: "H.G.", amount: "₦10,000", date: "26/11/2024", time: "10:30AM", status: "Confirmed" },
    { id: "#002", name: "Double Zork", amount: "₦20,000", date: "26/11/2024", time: "06:00PM", status: "Pending" },
    { id: "#003", name: "Larre Mexican", amount: "₦15,000", date: "26/11/2024", time: "04:00PM", status: "Confirmed" },
    { id: "#004", name: "Double Zork", amount: "₦5,000", date: "26/11/2024", time: "08:30AM", status: "Pending" },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-5 mb-5">
      <div className="lg:flex justify-between mb-4">
      <h3 className="text-lg font-semibold mb-4">Gifts History</h3>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg p-2 lg:w-1/3"
        />
      </div>
      <div className=" overflow-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr className="border-b">
            <th className=" text-nowrap">Id</th>
            <th className=" text-nowrap">Name</th>
            <th className=" text-nowrap">Amount</th>
            <th className=" text-nowrap">Date</th>
            <th className=" text-nowrap">Time</th>
            <th className=" text-nowrap">Status</th>
          </tr>
        </thead>
        <tbody>
          {gifts.map((gift, index) => (
            <tr key={index} className="border-b">
              <td className="py-3 px-3 text-nowrap">{gift.id}</td>
              <td className="py-3 px-3 text-nowrap">{gift.name}</td>
              <td className="py-3 px-3 text-nowrap">{gift.amount}</td>
              <td className="py-3 px-3 text-nowrap">{gift.date}</td>
              <td className="py-3 px-3 text-nowrap">{gift.time}</td>
              <td className="py-3 px-3 text-nowrap">
                <span className={`px-2 py-1 rounded ${gift.status === "Confirmed" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`}>
                  {gift.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default GiftsHistory;