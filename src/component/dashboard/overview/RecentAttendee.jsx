import React from "react";
import { Heading } from "../../Text";

const RecentAttendees = ({ overviewDetails }) => {
  
  // Helper function to truncate email
  const truncateEmail = (email) => {
    const [localPart, domain] = email.split("@");
    if (localPart.length > 3) {
      return `${localPart.slice(0, 3)}...@${domain}`;
    }
    return email; // Return as is if local part is 3 characters or less
  };

  const attendees = overviewDetails?.recentAttendees?.map(attendee => ({
    id: attendee._id,
    name: attendee.fullName,
    email: truncateEmail(attendee.email)
  }));

  // Get the first 6 attendees
  const displayedAttendees = attendees?.slice(0, 6);

  return (
    <div className="p-5 bg-primary1 shadow rounded-lg">
      <Heading level={3} className="text-lg font-semibold mb-4">Recent Attendees</Heading>
      <ul className="space-y-2">
        {displayedAttendees?.map((attendee, index) => (
          <li key={attendee.id} className="flex justify-between">
            <span className="text-[13px] w-4/12">{attendee.name}</span>
            <div className="flex flex-col items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-transparent border-2 border-primary11" />
              {/* Only show the line if it's not the last item */}
              {index !== displayedAttendees.length - 1 && (
                <div className="w-[2px] h-7 bg-primary11 mt-1" />
              )}
            </div>
            <span className="text-ter11 text-[13px] w-5/12">
              {attendee.email}
            </span>
          </li>
        ))}
      </ul>
      <button className="mt-4 text-primary11 w-9/12 border px-4 py-2 justify-center flex items-center rounded-xl font-medium mx-auto border-primary11 hover:bg-primary11 hover:text-white transition">
        View all attendees
      </button>
    </div>
  );
};

export default RecentAttendees;