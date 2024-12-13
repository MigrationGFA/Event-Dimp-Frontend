import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "../ShowToast";

const RecentlyCreatedWebsites = () => {
  const websites = [
    {
      id: 1,
      eventName: "TopeXDebo 2022",
      clientName: "Debo Omololu",
      websiteAddress: "https://Adetop.dimpified.com",
      eventType: "Wedding",
      tagColor: "bg-purple-500",
    },
    {
      id: 2,
      eventName: "Baby Karia",
      clientName: "Sholanke 2024",
      websiteAddress: "https://Adetop.dimpified.com",
      eventType: "Birthday",
      tagColor: "bg-red-500",
    },
    {
      id: 3,
      eventName: "Product Launch",
      clientName: "Jane Doe",
      websiteAddress: "https://example.com",
      eventType: "Corporate",
      tagColor: "bg-blue-500",
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      showToast("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link:", error);
      showToast("Failed to copy link.");
    }
  };

  return (
    <div className=" mt-10 mx-4 p-2 lg:mx-0 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold mb-6">Recently Created Websites</h3>
      <div className="space-y-6">
        {websites.map((website) => (
          <div
            key={website.id}
            className="p-5 border rounded-lg bg-gray-50 shadow-md lg:flex items-start space-x-4"
          >
            {/* Event Type Badge */}
            <div
              className={`w-10 h-10 flex items-center justify-center text-white font-bold rounded-full ${website.tagColor}`}
            >
              {website.eventType.charAt(0).toUpperCase()}
            </div>

            {/* Event Details */}
            <div className="flex-1 space-y-5">
              <h4 className="text-lg font-bold">
                Name of Event:{" "}
                <span className="font-normal">{website.eventName}</span>
              </h4>
              <p className="text-sm text-gray-600">
                Name of Client:{" "}
                <span className="font-medium">{website.clientName}</span>
              </p>
              <div className="flex items-start space-x-2">
                <p className="text-sm text-gray-600 flex flex-wrap">
                  Website Address:{" "}
                  <a
                    href={website.websiteAddress}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0AAA10] underline break-words ml-1"
                  >
                    {website.websiteAddress}
                  </a>
                </p>
                <button
                  onClick={handleCopy}
                  className="text-gray-600 hover:text-gray-800"
                  aria-label="Copy website address"
                >
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </div>

              <p className="text-sm text-gray-600">
                Event Type:{" "}
                <span className="font-medium">{website.eventType}</span>
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
              <button className="px-4 py-2 border border-green-500 text-green-500 text-sm font-medium rounded hover:bg-green-50">
                Share
              </button>
              <button className="px-4 py-2 border border-red-500 text-red-500 text-sm font-medium rounded hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyCreatedWebsites;
