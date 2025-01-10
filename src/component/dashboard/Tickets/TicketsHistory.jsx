import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const TicketsHistory = ({ ticketsPurchase }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  const generateStaticID = ticket => {
    if (!ticket.name || !ticket.email) {
      console.error("Missing name or email for ticket:", ticket);
      return "N/A"; // Fallback ID
    }
    const hash = CryptoJS.MD5(ticket.name + ticket.email).toString();
    return `DZ${hash.substring(0, 6).toUpperCase()}`;
  };

  useEffect(() => {
    if (!ticketsPurchase || ticketsPurchase.length === 0) return;

    const updatedTickets = ticketsPurchase
      .map(ticket => ({
        ...ticket,
        _id: generateStaticID(ticket),
        ticketType: ticket.ticketType || "N/A",
        paymentStatus: ticket.paymentStatus || "pending",
      }))
      .filter(ticket =>
        ticket.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    setFilteredTickets(updatedTickets);
  }, [searchQuery, ticketsPurchase]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = pageNumber => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-2 py-1 mx-1 rounded ${
              currentPage === i ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key="first"
          onClick={() => handlePageChange(1)}
          className="px-2 py-1 mx-1 rounded bg-gray-300"
        >
          1
        </button>
      );

      if (currentPage > 3) {
        pages.push(<span key="ellipsis1" className="px-2">...</span>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-2 py-1 mx-1 rounded ${
              currentPage === i ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(<span key="ellipsis2" className="px-2">...</span>);
      }

      pages.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          className="px-2 py-1 mx-1 rounded bg-gray-300"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 mb-5">
      <div className="lg:flex justify-between mb-4">
        <h3 className="text-lg font-semibold mb-4">Payments History</h3>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg p-2 lg:w-1/3"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="overflow-auto">
        <div className="max-w-full lg:max-w-5xl mx-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="px-4 text-nowrap">Id</th>
                <th className="px-4 text-nowrap">Name</th>
                <th className="px-4 text-nowrap">User Details</th>
                <th className="px-4 text-nowrap">Ticket Plan</th>
                <th className="px-4 text-nowrap">Amount</th>
                <th className="px-4 text-nowrap">Date</th>
                <th className="px-4 text-nowrap">Time</th>
                <th className="px-4 text-nowrap">Payment Status</th>
                <th className="px-4 text-nowrap">Status</th>
              </tr>
            </thead> 
            <tbody>
              {currentItems.map(ticket => (
                <tr key={ticket._id} className="border-b">
                  <td className="py-3 px-4 text-nowrap">{ticket._id}</td>
                  <td className="py-3 px-4 text-nowrap">{ticket.name}</td>
                  <td className="py-3 px-4 text-nowrap">
                    <div>Email: {ticket.email}</div>
                    <div>Phone: {ticket.phoneNumber || "N/A"}</div>
                    <div>Description: {ticket.shortDescription || "N/A"}</div>
                  </td>
                  <td className="py-3 px-4 text-nowrap">{ticket.ticketType || "N/A"}</td>
                  <td className="py-3 px-4 text-nowrap">{ticket.amount || "N/A"}</td>
                  <td className="py-3 px-4 text-nowrap">
                    {new Date(ticket.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-nowrap">
                    {new Date(ticket.date).toLocaleTimeString()}
                  </td>
                  <td className="py-3 px-4 text-nowrap">{ticket.paymentStatus}</td>
                  <td className="py-3 px-4 text-nowrap">
                    <span
                      className={`px-2 py-1 rounded ${
                        ticket.status === "confirmed"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-2 py-1 mx-1 rounded bg-gray-300"
        >
          {"<<"}
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 mx-1 rounded bg-gray-300"
        >
          {"<"}
        </button>
        {renderPagination()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 mx-1 rounded bg-gray-300"
        >
          {">"}
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 mx-1 rounded bg-gray-300"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default TicketsHistory;
