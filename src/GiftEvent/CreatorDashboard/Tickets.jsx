import React, { useState } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import { Heading, Text } from "../../component/Text";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { ButtonSmallPurple } from "../../component/Buttons";
import TicketsSummary from "../../component/dashboard/Tickets/TicketsSummary";
import TicketsHistory from "../../component/dashboard/Tickets/TicketsHistory";
import AddTicketPlanModal from "../../component/Modal/AddTicketPlanModal";
import { useDispatch } from "react-redux";
import { saveTicket } from "../../features/CreatedTicket";

const Tickets = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTicketPlan = () => {
    setIsModalOpen(true);
  };

  const handleSaveTicketPlan = (ticketData) => {
    dispatch(saveTicket(ticketData));
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
        <TicketsSummary />
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
