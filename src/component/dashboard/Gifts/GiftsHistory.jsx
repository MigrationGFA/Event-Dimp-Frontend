import React, { useState } from "react";
import { Spinner } from "flowbite-react";

const GiftsHistory = ({ giftHistory = {}, loading }) => {
  const itemsPerPage = 5; 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Extract the giftHistory array from the object
  const validGiftHistory = Array.isArray(giftHistory.giftHistory)
    ? giftHistory.giftHistory
    : [];



  // Filter gift history based on search query
  const filteredData = validGiftHistory.filter(
    (gift) =>
      gift.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gift.amount.toString().includes(searchQuery) ||
      gift.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gift.time.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gift.paymentStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get the current page's data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const changePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 mb-5">
      <div className="lg:flex justify-between mb-4">
        <h3 className="text-lg font-semibold mb-4">Gifts History</h3>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg p-2 lg:w-1/3"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to the first page on search
          }}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner size="xl" />
        </div>
      ) : filteredData.length > 0 ? (
        <div className="overflow-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="text-nowrap py-3 px-3">Name</th>
                <th className="text-nowrap py-3 px-3">Amount</th>
                <th className="text-nowrap py-3 px-3">Date</th>
                <th className="text-nowrap py-3 px-3">Time</th>
                <th className="text-nowrap py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((gift, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-3 text-nowrap">{gift.name}</td>
                  <td className="py-3 px-3 text-nowrap">₦{gift.amount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-nowrap">{gift.date}</td>
                  <td className="py-3 px-3 text-nowrap">{gift.time}</td>
                  <td className="py-3 px-3 text-nowrap">
                    <span
                      className={`px-2 py-1 rounded ${
                        gift.paymentStatus === "Confirmed"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {gift.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => changePage(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No matching gift history found.</p>
        </div>
      )}
    </div>
  );
};

export default GiftsHistory;
