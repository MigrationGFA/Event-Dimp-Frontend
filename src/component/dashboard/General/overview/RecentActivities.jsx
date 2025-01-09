import React, { useState } from "react";
import { Heading, Text } from "../../../Text";

const RecentActivities = ({ bookingDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Function to format date to "10 Oct 2024"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Pagination logic
  const totalItems = bookingDetails?.allBookings?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookingDetails?.allBookings?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full my-10 bg-primary1 shadow-md rounded-lg overflow-hidden">
      <Heading
        level={2}
        weight="font-bold"
        className="text-2xl font-bold mb-4 px-4"
      >
        Recent Activities
      </Heading>

      <div className="overflow-x-auto mx-3">
        {totalItems === 0 ? (
          <div className="flex justify-center items-center p-10">
            <Text className="text-ter6">No recent activities found.</Text>
          </div>
        ) : (
          <table className="min-w-full bg-primary1 border border-sec1">
            <thead>
              <tr className="border-b-2">
                <th className="py-4 px-4 border-b text-left">ID</th>
                <th className="py-4 px-4 border-b text-left">Customer Name</th>
                <th className="py-4 px-4 border-b text-left">Service</th>
                <th className="py-4 px-4 border-b text-left">Date</th>
                <th className="py-4 px-4 border-b text-left">Time</th>
                <th className="py-4 px-4 border-b text-left">Service Location</th>
                <th className="py-4 px-4 border-b text-left">Payment</th>
                <th className="py-4 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings?.map((activity) => (
                <tr key={activity.id} className="hover:bg-sec1">
                  <td className="pb-2 pt-6 px-4 border-b">{activity.bookingId}</td>
                  <td className="pb-2 pt-6 px-4 border-b">{activity.name}</td>
                  <td className="pb-2 pt-6 px-4 border-b">{activity.service}</td>
                  <td className="pb-2 pt-6 px-4 border-b">{formatDate(activity.date)}</td>
                  <td className="pb-2 pt-6 px-4 border-b">{activity.time}</td>
                  <td className="pb-2 pt-6 px-4 border-b">{activity.bookingType}</td>
                  <td className="pb-2 pt-6 px-4 border-b">{activity.paymentStatus}</td>
                  <td className="pb-2 pt-6 px-4 border-b lg:flex justify-center items-center gap-2 py-6">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "Pending"
                          ? "bg-ter7"
                          : "bg-ter6"
                      }`}
                    ></span>
                    <span
                      className={`font-semibold ${
                        activity.status === "Pending"
                          ? "text-ter7"
                          : "text-ter8"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination controls with arrows */}
      {totalItems > 0 && (
        <div className="flex justify-center my-4">
          <button
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === 1
                ? "bg-sec1 cursor-not-allowed"
                : "bg-primary3 text-primary1"
            }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === i + 1
                  ? "bg-primary3 text-primary1"
                  : "bg-sec1"
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === totalPages
                ? "bg-sec1 cursor-not-allowed"
                : "bg-primary3 text-primary1"
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivities;
