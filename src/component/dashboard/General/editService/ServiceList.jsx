import React from "react";
import ServiceCard from "./ServiceCard";
import { Heading, Text } from "../../../Text";
import { Spinner } from "flowbite-react"; // Importing the Spinner from Flowbite

const ServiceList = ({ allServices, loading, getAllServices }) => {
  return (
    <div>
      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner aria-label="Loading services..." size="xl" color="info" />
        </div>
      ) : (
        <>
          {allServices?.map((serviceGroup, index) => (
            <div key={serviceGroup._id} className="mx-5 lg:mx-1">
              <Heading level={2} className="text-xl font-semibold mb-4 mt-12">
                Section {index + 1}
              </Heading>
              <Heading level={2} className="text-xl font-semibold mb-4">
                I will {serviceGroup.header}
              </Heading>
              <Text className="text-ter11 mb-4">
                {serviceGroup.description}
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceGroup.services.map((service) => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    serviceGroup={serviceGroup}
                    getAllServices={getAllServices}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ServiceList;
