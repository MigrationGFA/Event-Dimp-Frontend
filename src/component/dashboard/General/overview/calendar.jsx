import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; 
import { Text, Heading } from "../../../../component/Text";

const MyCalendar = ({ date, handleDateChange }) => {
  return (
    <div className="p-4 bg-primary1 rounded-lg shadow-lg w-full lg:w-4/12 font-body">
      <Heading level={2} size="lg" className="text-lg font-semibold text-primary4">Today's Schedule</Heading>
      <Text  size="lg"className="text-gray-500 mb-4">{new Date(date).toLocaleDateString()}</Text>
      <Calendar 
        onChange={handleDateChange} 
        value={new Date(date)}
        className="border-none"
        tileClassName={({ date, view }) =>
          date.getDate() === new Date().getDate() && view === 'month' ? 'bg-[#FFC145] text-white rounded-full' : ''
        }
        nextLabel={<span className="text-primary3 font-bold">&gt;</span>}
        prevLabel={<span className="text-primary3 font-bold">&lt;</span>}
      />
      <style jsx>{`
        .react-calendar__navigation button {
          color: #2D1C4D;
          font-weight: bold;
        }
        .react-calendar__month-view__weekdays__weekday {
          color: #2D1C4D;
          font-weight: bold;
        }
        .react-calendar__tile {
          color: #2D1C4D;
          font-weight: bold;
        }
        .react-calendar__tile--active {
          background: #FF60E6 to #A55F95D4 !important;
          color: white !important;
          border-radius: 100%;
        }
        .react-calendar__tile a {
          text-decoration: none !important;
        }
      `}</style>
    </div>
  );
};

export default MyCalendar;
