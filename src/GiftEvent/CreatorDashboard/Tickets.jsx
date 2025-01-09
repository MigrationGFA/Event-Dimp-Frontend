import React, { useState, useEffect } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import { Heading, Text } from "../../component/Text";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { ButtonSmallPurple } from "../../component/Buttons";
import TicketsSummary from "../../component/dashboard/Tickets/TicketsSummary";
import TicketsHistory from "../../component/dashboard/Tickets/TicketsHistory";
import AddTicketPlanModal from "../../component/Modal/AddTicketPlanModal";
import { useSelector } from "react-redux";
import api from "../../api/DashboardApi";


const Tickets = () => {
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const creatorId = useSelector((state) => state.auth.user.creatorId);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [ticketsPurchase, setTicketsPurchase] = useState([]);
  const [ticketsPurchaseSummary, setTicketsPurchaseSummary] = useState([]);
    const [loading, setLoading] = useState(true);
  const handleAddTicketPlan = () => {
    setIsModalOpen(true);
  };

   useEffect(() => {
      getAllTicketsPurchase();
      getAllTicketsPurchaseSummary();
    }, [ecosystemDomain, accessToken, refreshToken]);

      const getAllTicketsPurchase = async () => {
        setLoading(true);
        try {
          const response = await api.creatorGetAllTicketPurchases({
            ecosystemDomain,
            accessToken,
            refreshToken,
          });
          setTicketsPurchase(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Could not get tickets:", error);
        } finally {
          setLoading(false);
        }
      };
      const getAllTicketsPurchaseSummary = async () => {
        setLoading(true);
        try {
          const response = await api.creatorGetAllTicketPurchasesSummary({
            ecosystemDomain,
            accessToken,
            refreshToken,
          });
          setTicketsPurchaseSummary(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Could not get tickets:", error);
        } finally {
          setLoading(false);
        }
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
  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
          Tickets
        </Heading>

        <img
          src={EditTemplateImage}
          alt=""
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>
      <div className="flex justify-end items-center my-8 px-4 lg:px-0">
        <ButtonSmallPurple onClick={handleAddTicketPlan}>
          Add Ticket Plan
        </ButtonSmallPurple>
      </div>

      <div className="mt-10 mx-4 lg:mx-0">
        <TicketsSummary setTicketsPurchaseSummary={setTicketsPurchaseSummary} />
        <TicketsHistory />
      </div>

      <AddTicketPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTicketPlan}
      />
    </CreatorDashboardLayout>
  );
};

export default Tickets;
