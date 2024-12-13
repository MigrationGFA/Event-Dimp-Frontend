import React from "react";
import { Heading } from "../../Text";

const RecentlyRegistered = () => {
  const registrations = [
    { location: "Indoor Venue", count: 50 },
    { location: "Outdoor Venue", count: 30 },
    { location: "Religious Venue", count: 20 },
    { location: "Beach Venue", count: 50 },
    { location: "Court Venue", count: 10 },
  ];

  return (
    <div className="bg-sec12 shadow rounded-lg p-5 mb-5">
      <Heading level={3} className="text-lg font-semibold mb-4">Recently Registered</Heading>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="">Location Area</th>
            <th className="">Number of Attendees</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg, index) => (
            <tr key={index} className="border-b">
              <td className="py-3">{reg.location}</td>
              <td className="py-3 text-end">{reg.count} Attendees</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentlyRegistered;