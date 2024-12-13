import React from "react";
import { Heading } from "../../Text";

const AttendeeActivities = () => {
  const activities = [
    {
      id: "#001",
      name: "Hassan Noor",
      location: "Wedding",
      amount: "$400,000",
      status: "Allowed",
    },
    {
      id: "#002",
      name: "Ruth Zamani",
      location: "Main Wedding",
      amount: "$10,000",
      status: "Rejected",
    },
    {
      id: "#003",
      name: "Joshua Musa",
      location: "Reception",
      amount: "N10,000,000",
      status: "Allowed",
    },
    {
      id: "#004",
      name: "Larre Mexican",
      location: "Reception",
      amount: "N10,000",
      status: "Allowed",
    },
  ];

  return (
    <div className="p-5 bg-white shadow rounded-lg mb-20">
      <div className="lg:flex justify-between mt-10 items-center mb-5">
        <Heading className="text-lg font-semibold mb-4">
          Recent Attendee Activities
        </Heading>
        <input
          type="text"
          placeholder="Search"
          className="lg:w-4/12 mb-4 p-2 border rounded-lg"
        />
      </div>
      <div className=" overflow-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="px-4 text-nowrap">Attendee ID</th>
              <th className="px-4 text-nowrap">Attendee Name</th>
              <th className="px-4 text-nowrap">Location Attended</th>
              <th className="px-4 text-nowrap">Amount Gifted</th>
              <th className="px-4 text-nowrap">Status</th>
             
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 ">{activity.id}</td>
                <td className="py-2">{activity.name}</td>
                <td className="py-2">{activity.location}</td>
                <td className="py-2">{activity.amount}</td>
                <td>
                  <span className="px-2 py-1 rounded">{activity.status}</span>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendeeActivities;
