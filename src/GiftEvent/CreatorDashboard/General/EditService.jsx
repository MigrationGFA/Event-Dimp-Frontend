import React, { useEffect, useState } from "react";
import CreatorDashboardLayout from "../../../layout/Creator/CreatorDashboardLayout";
import EditTemplateImage from "../../../assets/EditTemplate.svg";
import { Heading, Text } from "../../../component/Text";
import { ButtonSmallPurple } from "../../../component/Buttons";
import api from "../../../api/DashboardApi";
import { useSelector } from "react-redux";
import ServiceList from "../../../component/dashboard/General/editService/ServiceList";
import { useNavigate } from "react-router-dom";

const EditService = () => {
  const navigate = useNavigate();
  const [allServices, setAllServices] = useState(null);
  const [loading, setLoading] = useState(false);
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllServices();
  }, [ecosystemDomain, accessToken, refreshToken]);

  const getAllServices = async () => {
    setLoading(true);
    try {
      if (!accessToken || !refreshToken) return;

      const response = await api.creatorEcosystemServices({
        ecosystemDomain,
        accessToken,
        refreshToken,
      });
      setAllServices(response.data);

    } catch (error) {
      console.error("Could not get services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewService = () => {
    navigate("/creator/dashboard/create-service");
  };
  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
          Manage Services
        </Heading>

        <img
          src={EditTemplateImage}
          alt="Edit template"
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>
      <div className="lg:flex items-center justify-center lg:justify-between my-8 px-4 lg:px-0">
        <div>
          <Text className="lg:text-xl text-sm font-semibold text-primary2">
            Available Services
          </Text>
          <Text className="text-sm font-medium text-ter11">
            Click on edit service to make changes
          </Text>
        </div>
        <div className="lg:4/12">
          <ButtonSmallPurple
            onClick={handleAddNewService}
            bg="primary3"
            className="text-primary1 lg:py-3 py-1 lg:px-5 px-2 rounded-lg"
          >
            Add New Services
          </ButtonSmallPurple>
        </div>
      </div>
      <div>
        {/* Passing the getAllServices function as a prop to ServiceList */}
        <ServiceList
          allServices={allServices}
          loading={loading}
          getAllServices={getAllServices}
        />
      </div>
    </CreatorDashboardLayout>
  );
};

export default EditService;
