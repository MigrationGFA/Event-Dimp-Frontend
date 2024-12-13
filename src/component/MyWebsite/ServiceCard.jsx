import React, { useState } from "react";
import Location from "../../assets/Location.svg";
import Time from "../../assets/Time.svg";
import { Heading } from "../Text";
import { ButtonSmallWhite } from "../Buttons";
import { ButtonSmallPurple } from "../Buttons"; // Correct import path

const ServiceCard = ({ service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <div className="relative">
        <img
          src={service.serviceImage || "/path/to/default.jpg"}
          alt={service.name || "Service Image"}
          className="w-full h-[250px] object-cover"
        />
        <div className="absolute flex bottom-0 right-4 bg-purple-600 text-white rounded-full py-2 px-4">
        
          {service.eventName.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="p-4">
        <Heading level={3} className="text-lg font-semibold">
          {service.name || "Unnamed Service"}
        </Heading>
        <div className="flex items-center mt-2 text-gray-500">
          <img src={Location} alt="Location" className="w-4 h-4" />
          <span className="ml-1">{service.eventName || "Unknown Event"}</span>
        </div>
        <div className="flex items-center mt-2 text-gray-500">
         <img src={Time} alt="Time" className="w-4 h-4" />
          {service.attendees || "N/A"} attendees
        </div>
       
        <div className="mt-4 flex gap-3">
          <ButtonSmallWhite
            onClick={() => alert(`Deleting ${service.name}`)}
            className="w-full py-2 border border-red-500 text-red-500 rounded hover:bg-purple-600 hover:text-white transition"
          >
            Delete
          </ButtonSmallWhite>
          <ButtonSmallPurple
            onClick={() => window.open(service.websiteLink, "_blank")}
            className="w-full py-2 border border-purple-600 text-white rounded hover:bg-purple-600 hover:text-white transition"
          >
            Dashboard
          </ButtonSmallPurple>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
