import React, { useState } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import { Heading, Text } from "../../component/Text";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { ButtonSmallPurple } from "../../component/Buttons";
import AddTicketPlanModal from "../../component/Modal/AddTicketPlanModal";
import { useDispatch } from "react-redux";
import { saveTicket } from "../../features/CreatedTicket";
import TicketCard from "../../component/dashboard/Tickets/TicketCard";

const TicketsPlan = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tickets, setTickets] = useState([
    {
      name: "Bronze Ticket",
      price: "₦15,000",
      features: ["General Admission", "Standard Seating", "Entry to main event only"],
    },
    {
      name: "Silver Ticket",
      price: "₦15,000",
      features: ["General Admission", "Standard Seating", "Entry to main event only"],
    },
    // Add more ticket objects here
  ]);

  const handleAddTicketPlan = () => {
    setIsModalOpen(true);
  };

  const handleSaveTicketPlan = (ticketData) => {
    dispatch(saveTicket(ticketData));
    setTickets([...tickets, ticketData]); // Add the new ticket to the list
    setIsModalOpen(false);
  };

  const handleEditTicketPlan = (ticket) => {
    // Implement edit logic here
    console.log("Edit Ticket Plan:", ticket);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-1">
        {tickets.map((ticket, index) => (
          <TicketCard
            key={index}
            ticket={ticket}
            onEdit={handleEditTicketPlan}
          />
        ))}
      </div>

      <AddTicketPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTicketPlan}
      />
    </CreatorDashboardLayout>
  );
};

export default TicketsPlan;
