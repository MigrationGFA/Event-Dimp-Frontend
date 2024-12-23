import React, { useState, useEffect } from "react";
import Location from "../../../../assets/Location.svg";
import Time from "../../../../assets/Time.svg";
import EditServiceModal from "../../../../component/Modal/EditServiceModal";
import { Heading } from "../../../Text";
import { ButtonSmallWhite } from "../../../Buttons";
// import Api from "../../../api/DashboardApi";
import { useSelector } from "react-redux";
import SuccessModal from "../../../../component/Modal/SuccessfulModal";

const ServiceCard = ({ service, serviceGroup, getAllServices }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccessModalClose = () => {
    if (getAllServices) {
         getAllServices();
    }
  };

  const handleSaveChanges = async (updatedService) => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await Api.creatorEditService({
        accessToken,
        refreshToken,
        serviceId: serviceGroup._id,
        name: updatedService.name,
        shortDescription: updatedService.shortDescription,
        price: updatedService.price,
        deliveryTime: updatedService.deliveryTime,
        priceFormat: updatedService.priceFormat,
        serviceImage: updatedService.serviceImage,
        subServiceId: updatedService._id,
      });

      setIsModalOpen(false);
        setIsSuccessModalOpen(true);

    } catch (error) {
      console.error("Failed to edit service:", error);
      setError("Failed to edit service.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="bg-primary1 rounded-lg shadow-md overflow-hidden relative">
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        message="Your changes have been saved successfully."
        buttonText="See Your Service"
        onButtonClick={handleSuccessModalClose}
      />

      <div className="relative">
        <img
          src={service.serviceImage}
          alt={service.name}
          className="w-full h-[250px] object-cover"
        />
        <div className="absolute bottom-[-30px] right-4 bg-primary3 text-primary1 rounded-full py-8 px-5">
          ₦{service.price}
        </div>
      </div>
      <div className="p-4 mt-3">
        <Heading level={3} className="text-lg font-semibold">
          {service.name}
        </Heading>
        <p className="text-ter11" style={{ height: "70px" }}>
          {service.shortDescription}
        </p>
        <div className="flex items-center mt-2 text-ter11">
          <img src={Location} alt="Location" />
          <span className="ml-1">{serviceGroup.format}</span>
        </div>
        <div className="flex items-center mt-1 text-ter11">
          <img src={Time} alt="Time" />
          <span className="ml-1">{service.deliveryTime}</span>
        </div>
        <ButtonSmallWhite
          onClick={handleEditClick}
          className="mt-4 w-full py-2 px-4 border border-primary3 text-primary3 rounded hover:bg-primary3 hover:text-primary1 transition"
        >
          Edit Service
        </ButtonSmallWhite>
      </div>

      {isModalOpen && (
        <EditServiceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          serviceData={service}
          handleSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default ServiceCard;
