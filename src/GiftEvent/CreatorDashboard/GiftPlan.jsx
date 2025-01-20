import React, { useState, useEffect } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import { Heading, Text } from "../../component/Text";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { ButtonSmallPurple } from "../../component/Buttons";
import AddGiftPlanModal from "../../component/Modal/AddGiftPlanModal";
import { useSelector } from "react-redux";
import api from "../../api/DashboardApi";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../component/ShowToast";
import { Spinner } from "flowbite-react";
import GiftCard from "../../component/dashboard/Gifts/GiftCard";

const GiftsPlan = () => {
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const creatorId = useSelector((state) => state.auth.user.creatorId);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllGifts();
  }, [ecosystemDomain, accessToken, refreshToken]);

  const getAllGifts = async () => {
    setLoading(true);
    try {
      const response = await api.creatorGetAllGift({
        ecosystemDomain,
        accessToken,
        refreshToken,
      });
      setGifts(response.data.giftPlan);
      console.log(response.data.giftPlan);
    } catch (error) {
      console.error("Could not get gifts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGiftPlan = () => {
    setIsModalOpen(true);
  };

  const handleSaveGiftPlan = async (giftData) => {
    try {
      const response = await api.creatorCreateGift({
        ecosystemDomain,
        accessToken,
        refreshToken,
        creatorId,
        ...giftData,
      });
      showToast(response.data.message, "success");
      getAllGifts();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Could not create gifts:", error);
    }
  };

  const handleEditGiftPlan = async (updatedGiftData) => {
    try {
      const response = await api.creatorEditGift({
        ecosystemDomain,
        accessToken,
        refreshToken,
        ...updatedGiftData,
      });
      showToast(response.data.message, "success");
      getAllGifts();
    } catch (error) {
      console.error("Could not edit ticket:", error);
    }
  };

  const handleDeleteTicketPlan = async (giftId) => {
    try {
      const response = await api.creatorDeleteTicket({
        ecosystemDomain,
        accessToken,
        refreshToken,
        giftId,
      });
      showToast(response.data.message, "success");
      getAllTickets();
    } catch (error) {
      console.error("Could not delete ticket:", error);
    }
  };

  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
        Gifts Plans
        </Heading>
        <img
          src={EditTemplateImage}
          alt=""
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>

      <div className="flex justify-between items-center my-8 px-4 lg:px-1">
        <Text>Available Gift Plans</Text>
        <ButtonSmallPurple onClick={handleAddGiftPlan}>
          Add Gift Plan
        </ButtonSmallPurple>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner size="xl" />
        </div>
      ) : gifts.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <Text className="text-lg text-gray-500 mb-4">
            No Gift plans available.
          </Text>
          <ButtonSmallPurple onClick={handleAddGiftPlan} width="auto">
            Create Your First Gift Plan
          </ButtonSmallPurple>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-1">
          {gifts.map((gifts, index) => (
            <GiftCard
              key={index}
              gift={gifts}
              onEdit={handleEditGiftPlan}
              onDelete={handleDeleteTicketPlan}
            />
          ))}
        </div>
      )}

      <AddGiftPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveGiftPlan}
      />
    </CreatorDashboardLayout>
  );
};

export default GiftsPlan;
