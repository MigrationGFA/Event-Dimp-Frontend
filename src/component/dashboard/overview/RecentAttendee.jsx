import React from "react";
import { Heading } from "../../Text";

const RecentAttendees = () => {
  const attendees = [
    { name: "Akande's Family", location: "🏛 Church, Lagos" },
    { name: "Jades Vinicius", location: "Reception"},
    { name: "Akande's Family", location: "Church and Reception"},
    { name: "Jades Vinicius", location: "🏛 Church, Lagos"},
    { name: "Yemik Adedoyin", location: "Reception"},
  ];

  return (
    <div className="p-5 bg-primary1 shadow rounded-lg">
      <Heading level={3} className="text-lg font-semibold mb-4">Recent Attendees</Heading>
      <ul className="space-y-2">
        {attendees.map((attendee, index) => (
          <li key={index} className="flex justify-between">
            <span className="text-[13px] w-4/12">{attendee.name}</span>
            <div className="flex flex-col items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-transparent border-2 border-primary11" />
              {/* Only show the line if it's not the last item */}
              {/* {index !== attendees.length - 1 && ( */}
                <div className="w-[2px] h-7 bg-primary11 mt-1" />
              {/* )} */}
            </div>

            <span className="text-ter11 text-[13px] w-5/12">
              {attendee.location}
            </span>
          </li>
        ))}
      </ul>
      <button className="mt-4 text-primary11 w-9/12 border px-4 py-2 justify-center flex items-center rounded-xl font-medium mx-auto  border-primary11  hover:bg-primary11 hover:text-white transition">
  View all attendees
</button>

    </div>
  );
};

export default RecentAttendees;
