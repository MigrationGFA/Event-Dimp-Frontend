import React from "react";
import ServiceCard from "./ServiceCard";
import { Spinner } from "flowbite-react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { Heading } from "../Text";
import { ButtonSmallPurple } from "../Buttons";

const ServiceList = () => {
  // Dummy data
  const allServices = [
    {
      _id: "1",
      services: [
        {
          _id: "1-1",
          name: "Wedding Planning",
          eventName: "AdeTop 2024",
          clientName: "Adebowale",
          attendees: "500,000",
          serviceImage: "/path/to/image1.jpg",
          websiteLink: "https://adetop2024.dimpified.com",
         
        },
        {
          _id: "1-2",
          name: "Corporate Event Planning",
          eventName: "Corporate Conclave 2024",
          clientName: "XYZ Inc.",
          attendees: "300,000",
          serviceImage: "/path/to/image2.jpg",
          websiteLink: "https://corporate2024.dimpified.com",
          
        },
        {
          _id: "1-1",
          name: "Wedding Planning",
          eventName: "AdeTop 2024",
          clientName: "Adebowale",
          attendees: "500,000",
          serviceImage: "/path/to/image1.jpg",
          websiteLink: "https://adetop2024.dimpified.com",
         
        },
        {
          _id: "1-2",
          name: "Corporate Event Planning",
          eventName: "Corporate Conclave 2024",
          clientName: "XYZ Inc.",
          attendees: "300,000",
          serviceImage: "/path/to/image2.jpg",
          websiteLink: "https://corporate2024.dimpified.com",
          
        },
        {
          _id: "1-1",
          name: "Wedding Planning",
          eventName: "AdeTop 2024",
          clientName: "Adebowale",
          attendees: "500,000",
          serviceImage: "/path/to/image1.jpg",
          websiteLink: "https://adetop2024.dimpified.com",
         
        },
        {
          _id: "1-2",
          name: "Corporate Event Planning",
          eventName: "Corporate Conclave 2024",
          clientName: "XYZ Inc.",
          attendees: "300,000",
          serviceImage: "/path/to/image2.jpg",
          websiteLink: "https://corporate2024.dimpified.com",
          
        },
      ],
    },
  ];

  const loading = false; // Simulate loading state

  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
          Manage Website
        </Heading>
        <img
          src={EditTemplateImage}
          alt="Edit Template"
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>

      <div className="flex space-x-4 w-full mt-6 items-center justify-center lg:justify-end lg:w-full">
        <ButtonSmallPurple
          width="80px"
          padding="1"
          className="text-sm lg:text-lg px-2"
        >
          Back to Overview
        </ButtonSmallPurple>
        </div>
    <div className="p-5">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner aria-label="Loading services..." size="xl" color="info" />
        </div>
      ) : (
        <>
          {allServices.map((serviceGroup) => (
            <div key={serviceGroup._id} className=" lg:mx-1 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceGroup.services.map((service) => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    serviceGroup={serviceGroup}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
    </CreatorDashboardLayout>
  );
};

export default ServiceList;
