import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "flowbite-react";
import { showToast } from "../ShowToast";

const RecentlyCreatedWebsites = ({ websites, loading }) => {
  const [isLoading, setIsLoading] = useState(loading);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const handleCopy = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      showToast("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link:", error);
      showToast("Failed to copy link.");
    }
  };

  const handleShare = async (link) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this website!",
          text: "Here's the link to a recently created website:",
          url: link,
        });
        showToast("Link shared successfully!");
      } catch (error) {
        console.error("Failed to share link:", error);
        showToast("Failed to share link.");
      }
    } else {
      showToast("Sharing is not supported on this device.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  const totalPages = Math.ceil(websites?.ecosystems?.length / itemsPerPage);
  const currentWebsites = websites?.ecosystems?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPagination = () => {
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-4 py-2 mx-1 ${
              currentPage === i ? "bg-gray-300" : "bg-gray-200"
            } text-gray-700 rounded hover:bg-gray-300`}
          >
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className={`px-4 py-2 mx-1 ${
            currentPage === 1 ? "bg-gray-300" : "bg-gray-200"
          } text-gray-700 rounded hover:bg-gray-300`}
        >
          1
        </button>
      );
      if (currentPage > 2) {
        pages.push(<span key="dots1" className="px-4 py-2 mx-1">...</span>);
      }
      if (currentPage > 1 && currentPage < totalPages) {
        pages.push(
          <button
            key={currentPage}
            onClick={() => setCurrentPage(currentPage)}
            className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded"
          >
            {currentPage}
          </button>
        );
      }
      if (currentPage < totalPages - 1) {
        pages.push(<span key="dots2" className="px-4 py-2 mx-1">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={`px-4 py-2 mx-1 ${
            currentPage === totalPages ? "bg-gray-300" : "bg-gray-200"
          } text-gray-700 rounded hover:bg-gray-300`}
        >
          {totalPages}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="mt-10 mx-4 p-2 lg:mx-0 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold mb-6">Recently Created Websites</h3>
      <div className="space-y-6">
        {currentWebsites?.map((website) => (
          <div
            key={website._id}
            className="p-5 border rounded-lg bg-gray-50 shadow-md lg:flex items-start space-x-4"
          >
            {/* Event Type Badge */}
            <div
              className={`w-10 h-10 flex items-center justify-center text-white font-bold rounded-full bg-purple-500`}
            >
              {website.type.charAt(0).toUpperCase()}
            </div>

            {/* Event Details */}
            <div className="flex-1 space-y-5">
              <h4 className="text-lg font-bold">
                Name of Event:{" "}
                <span className="font-normal">{website.ecosystemName}</span>
              </h4>
              <p className="text-sm text-gray-600">
                Name of Client:{" "}
                <span className="font-medium">{website.ecosystemDomain}</span>
              </p>
              <div className="flex items-start space-x-2">
                <p className="text-sm text-gray-600 flex flex-wrap">
                  Website Address:{" "}
                  <a
                    href={`https://${website.ecosystemDomain}.dimpified.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0AAA10] underline break-words ml-1"
                  >
                    {`https://${website.ecosystemDomain}.dimpified.com`}
                  </a>
                </p>
                <button
                  onClick={() =>
                    handleCopy(`https://${website.ecosystemDomain}.dimpified.com`)
                  }
                  className="text-gray-600 hover:text-gray-800"
                  aria-label="Copy website address"
                >
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </div>

              <p className="text-sm text-gray-600">
                Event Type:{" "}
                <span className="font-medium">{website.type}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-6 mt-4 lg:mt-0">
              <a
                href="#"
                className="px-4 py-2 bg-primary3 text-white text-sm font-medium rounded hover:bg-purple-600"
              >
                Go to Dashboard
              </a>
              <button
                onClick={() =>
                  handleShare(`https://${website.ecosystemDomain}.dimpified.com`)
                }
                className="px-4 py-2 border border-green-500 text-green-500 text-sm font-medium rounded hover:bg-green-50"
              >
                Share
              </button>
              <button className="px-4 py-2 border border-red-500 text-red-500 text-sm font-medium rounded hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        {renderPagination()}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentlyCreatedWebsites;
