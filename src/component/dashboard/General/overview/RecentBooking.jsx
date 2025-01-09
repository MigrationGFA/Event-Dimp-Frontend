import React, { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { Text, Heading } from "../../../../component/Text";
import { useNavigate } from "react-router-dom";
import { ButtonLongPurple } from "../../../Buttons";
import { useLocation } from "react-router-dom";

const RecentBookings = ({
  bookingsByDate,
  errorBookingsByDate,
  isBookingLoading,
}) => {
  const [currentBookings, setCurrentBookings] = useState([]);
  const navigate = useNavigate();
  const handleRecentBooking = () => {
    navigate("/creator/dashboard/booking");
  };

  const location = useLocation();

  const shouldShowButton = location.pathname !== "/creator/dashboard/booking";

  useEffect(() => {
    if (bookingsByDate && bookingsByDate) {
      setCurrentBookings(bookingsByDate);
    } else {
      setCurrentBookings([]);
    }
  }, [bookingsByDate]);

  // Get current time in minutes
  const currentDate = new Date();
  const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();

  const convertTimeToMinutes = (time) => {
    const timeParts = time.split(" ");
    let [hours, minutes] = timeParts[0].split(":").map(Number);

    if (timeParts.length === 2) {
      const period = timeParts[1].toUpperCase();
      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
    }

    return hours * 60 + minutes;
  };

  // Filter bookings where the booking time is in the future or now
  const validBookings = currentBookings.filter((booking) => {
    const bookingTimeInMinutes = convertTimeToMinutes(booking.time);
    return bookingTimeInMinutes >= currentTime;
  });

  // Limit to first 5 valid bookings
  const displayedBookings = validBookings.slice(0, 5);

  return (
    <div className="p-4 relative bg-primary1 rounded-lg shadow-lg lg:w-4/12">
      <Heading level={2} size="lg" className="text-primary3">
        Recent Bookings
      </Heading>
      <Text className="text-primary8 mb-4">Today's bookings</Text>

      {isBookingLoading ? (
        <div className="flex justify-center items-center">
          <Spinner
            color="purple"
            aria-label="Purple spinner example"
            size="lg"
          />
        </div>
      ) : errorBookingsByDate ? (
        <Text>
          {typeof errorBookingsByDate === "string"
            ? errorBookingsByDate
            : errorBookingsByDate instanceof Error
            ? errorBookingsByDate.message
            : "An unexpected error occurred."}
        </Text>
      ) : displayedBookings.length === 0 ? (
        <Text>No bookings found for this date.</Text>
      ) : (
        <ul className="relative">
          {displayedBookings.map((booking, index) => (
            <li key={index} className="flex items-center mb-4 relative">
              {/* Vertical line connecting indicators */}
              {index < displayedBookings.length - 1 && (
                <div
                  className="absolute left-[5px] border-l-2 border-sec4 h-full"
                  style={{ top: "15px", height: "50px" }}
                ></div>
              )}
              {/* Booking content */}
              <div className="flex items-center mb-5">
                <span
                  className={`w-3 h-3 rounded-full border-2 border-primary1 ${
                    index % 2 === 0 ? "bg-ter8" : "bg-sec5"
                  }`}
                ></span>
                <span className="ml-4 mr-2 text-sm text-sec3">
                  {booking.time}
                </span>
                <span className="text-sm text-sec3">{booking.name}</span>
              </div>
            </li>
          ))}
          {shouldShowButton && (
            <div>
              <ButtonLongPurple
                className="bg-sec5 text-primary4 py-3 px-5 bottom-0 lg:bottom-[-70px] lg:absolute w-full rounded-xl"
                onClick={handleRecentBooking}
              >
                View all bookings
              </ButtonLongPurple>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default RecentBookings;
