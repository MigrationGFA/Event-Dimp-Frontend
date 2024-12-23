import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreatorDashboardLayout from "../../../../layout/Creator/CreatorDashboardLayout";
import { Heading } from "../../../../component/Text";
import { ButtonSmallPurple, ButtonSmallWhite } from "../../../Buttons";
import { removeService, updateService, resetService } from "../../../../features/CreateService";
import EditServiceModal from "../../../../component/Modal/EditCreatedServicesModal";
import Location from "../../../../assets/Location.svg";
import Time from "../../../../assets/Time.svg";
import api from "../../../../api/creatorApis";
import { showToast } from "../../../ShowToast";

const CreatedServices = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const services = useSelector((state) => state.createNewService.services);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const creatorId = useSelector((state) => state.auth.user?.creatorId);

  const handleEditClick = (service) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  const handleUpdateService = (updatedService) => {
    dispatch(updateService(updatedService));
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = (serviceId) => {
    dispatch(removeService(serviceId));
  };

  const handleBackToDashboard = () => {
    navigate("/creator/dashboard/edit-service");
  };

  const handleAddAnotherService = () => {
    navigate("/creator/dashboard/create-service");
  };

  const handleSubmitAll = async () => {
    setLoading(true);

    try {
      const response = await api.createServices({
        creatorId,
        ecosystemDomain: ecosystemDomain,
        category: "Personal Care Service",
        subCategory: "Barber Shop",
        prefix: "I will",
        header: "give a nice hair cut of your choice",
        description:
          "The service offers you a nice and profession hair services",
        format: "Onsite",
        currency: "NGN",
        services: services,
        accessToken,
        refreshToken,
        dispatch,
        navigate,
      });
      if (response.data.message === "Service created succesfully") {
        showToast("Service Created Successfully", "success");
        dispatch(resetService());
        navigate("/creator/dashboard/edit-service");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("this is error", error);
      showToast("Error creating template");
    }
  };

  return (
    <CreatorDashboardLayout>
      <div className="">
        {/* Header Section */}
        <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body shadow-lg">
          <div className="flex justify-between items-start">
            <Heading className="font-semibold text-[26px] text-primary4">
              Created Services
            </Heading>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 mb-8">
          <ButtonSmallWhite
            className="border border-primary3 text-primary3 rounded-md px-4 py-2 hover:bg-ter14"
            onClick={handleBackToDashboard}
          >
            Back to Dashboard
          </ButtonSmallWhite>
          <ButtonSmallPurple
            className="bg-primary3 text-primary1 rounded-md px-4 py-2 hover:bg-primary3"
            onClick={handleAddAnotherService}
          >
            Add Another Service
          </ButtonSmallPurple>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-primary1 shadow-md rounded-md p-4"
            >
              <div className="relative">
                <img
                  src={service.serviceImage }
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="absolute top-[150px] right-3 bg-primary3 text-primary1 text-sm rounded-full px-5 py-7">
                  {service.price}
                </div>
              </div>
              <div className="p-4">
                <Heading className="font-semibold text-lg">
                  {service.name}
                </Heading>
                <p
                  className="text-ter4 text-sm mb-2"
                  style={{ height: "50px" }}
                >
                  {service.shortDescription}
                </p>
                <div className="items-center text-ter11 text-md space-y-2 mt-3 mb-4">
                  <div className="flex items-center mr-4 gap-3">
                    <img src={Location} alt="Location icon" />
                    {service.priceFormat}
                  </div>
                  <div className="flex items-center gap-3">
                    <img src={Time} alt="Time icon" />
                    {service.deliveryTime}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    className="border border-primary3 text-primary3 rounded-md px-3 py-1 text-sm hover:bg-ter14"
                    onClick={() => handleEditClick(service)}
                  >
                    Edit Service
                  </button>
                  <button
                    className="bg-ter6 text-white rounded-md px-3 py-1 text-sm hover:bg-ter7"
                    onClick={() => handleDeleteClick(service.id)}
                  >
                    Delete Service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit All Button */}
        <div className="flex mt-8">
          <ButtonSmallPurple
            className="bg-primary3 text-primary1 rounded-md px-8 py-2 hover:bg-primary3"
            onClick={handleSubmitAll}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit All"}
          </ButtonSmallPurple>
        </div>

        {/* Edit Service Modal */}
        {isEditModalOpen && selectedService && (
          <EditServiceModal
            service={selectedService}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleUpdateService}
          />
        )}
      </div>
    </CreatorDashboardLayout>
  );
};

export default CreatedServices;
