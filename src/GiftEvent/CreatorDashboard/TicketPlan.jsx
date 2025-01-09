import React, { useState, useEffect } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import { Heading, Text } from "../../component/Text";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { ButtonSmallPurple } from "../../component/Buttons";
import AddTicketPlanModal from "../../component/Modal/AddTicketPlanModal";
import { useSelector } from "react-redux";
import api from "../../api/DashboardApi";
import TicketCard from "../../component/dashboard/Tickets/TicketCard";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../component/ShowToast";
import { Spinner } from "flowbite-react";

const TicketsPlan = () => {
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const creatorId = useSelector((state) => state.auth.user.creatorId);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTickets();
  }, [ecosystemDomain, accessToken, refreshToken]);

  const getAllTickets = async () => {
    setLoading(true);
    try {
      const response = await api.creatorGetAllTicket({
        ecosystemDomain,
        accessToken,
        refreshToken,
      });
      setTickets(response.data.tickets);
      console.log(response.data.tickets);
    } catch (error) {
      console.error("Could not get tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTicketPlan = () => {
    setIsModalOpen(true);
  };

  const handleSaveTicketPlan = async (ticketData) => {
    try {
      const response = await api.creatorCreateTicket({
        ecosystemDomain,
        accessToken,
        refreshToken,
        creatorId,
        ...ticketData,
      });
      showToast(response.data.message, "success");
      getAllTickets();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Could not create ticket:", error);
    }
  };

  const handleEditTicketPlan = async (ticketData) => {
    try {
      const response = await api.creatorEditTicket({
        ecosystemDomain,
        accessToken,
        refreshToken,
        ...ticketData,
      });
      showToast(response.data.message, "success");
      getAllTickets();
    } catch (error) {
      console.error("Could not edit ticket:", error);
    }
  };

  const handleDeleteTicketPlan = async (ticketId) => {
    try {
      const response = await api.creatorDeleteTicket({
        ecosystemDomain,
        accessToken,
        refreshToken,
        ticketId,
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
          Tickets Plans
        </Heading>
        <img
          src={EditTemplateImage}
          alt=""
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>

      <div className="flex justify-between items-center my-8 px-4 lg:px-1">
        <Text>Available Ticket Plans</Text>
        <ButtonSmallPurple onClick={handleAddTicketPlan}>
          Add Ticket Plan
        </ButtonSmallPurple>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner size="xl" />
        </div>
      ) : tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <Text className="text-lg text-gray-500 mb-4">
            No ticket plans available.
          </Text>
          <ButtonSmallPurple onClick={handleAddTicketPlan}>
            Create Your First Ticket Plan
          </ButtonSmallPurple>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-1">
          {tickets.map((ticket, index) => (
            <TicketCard
              key={index}
              ticket={ticket}
              onEdit={handleEditTicketPlan}
              onDelete={handleDeleteTicketPlan}
            />
          ))}
        </div>
      )}

      <AddTicketPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTicketPlan}
      />
    </CreatorDashboardLayout>
  );
};

export default TicketsPlan;
