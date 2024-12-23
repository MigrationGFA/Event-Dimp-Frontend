import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreatorDashboardLayout from "../../../layout/Creator/CreatorDashboardLayout";
import { Heading } from "../../../component/Text";
import { ButtonSmallPurple, ButtonSmallWhite } from "../../Buttons";
import {
  updateTicket,
  removeTicket,
  resetTickets,
} from "../../../features/CreatedTicket";
import AddTicketPlanModal from "../../Modal/AddTicketPlanModal";
import Location from "../../../assets/Location.svg";
import Time from "../../../assets/Time.svg";
import api from "../../../api/creatorApis";
import { showToast } from "../../ShowToast";
import { saveTicket } from "../../../features/CreatedTicket";
import EditTicketPlanModal from "../../Modal/EditTicketPlanModal";

const CreatedTickets = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.ticket.tickets);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //   const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  //   const { accessToken, refreshToken } = useSelector((state) => state.auth);

  //const creatorId = useSelector((state) => state.auth.user?.creatorId);

  const handleEditClick = (ticket) => {
    console.log(ticket);
    setSelectedTicket(ticket);
    setIsEditModalOpen(true);
  };

  const handleUpdateTicket = (updatedTicket) => {
    dispatch(updateTicket(updatedTicket));
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = (ticketId) => {
    dispatch(removeTicket(ticketId));
  };

  const handleBackToDashboard = () => {
    navigate("/creator/dashboard/tickets");
  };

  const handleSaveTicketPlan = (ticketData) => {
    dispatch(saveTicket(ticketData));
  };

  const handleAddTicketPlan = () => {
    setIsModalOpen(true);
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
        services: tickets,
        // accessToken,
        // refreshToken,
        // dispatch,
        // navigate,
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
              Created Tickets
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
            onClick={handleAddTicketPlan}
          >
            Add Another Ticket
          </ButtonSmallPurple>
        </div>
        {/* Created Services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white shadow-md rounded-md p-6 border"
            >
              <div className="relative">
                <Heading className="font-semibold text-xl text-primary4 mb-2">
                  {ticket.ticketName}
                </Heading>
              </div>
              <div className="">
                <p className="text-lg text-primary3 mb-2">
                  ₦{ticket.ticketPrice}
                </p>
                <p
                  className="text-ter4 text-sm mb-4"
                  style={{ height: "50px" }}
                >
                  <div className="flex items-center gap-3">
                    <img src={Time} alt="Time icon" />
                    {ticket.ticketDescription}
                  </div>
                </p>

                <div className="flex justify-between">
                  <button
                    className="border border-primary3 text-primary3 rounded-md px-3 py-2 text-sm hover:bg-ter14"
                    onClick={() => handleEditClick(ticket)}
                  >
                    Edit Ticket
                  </button>
                  <button
                    className="bg-ter7 text-white rounded-md px-3 py-1 text-sm hover:bg-ter8"
                    onClick={() => handleDeleteClick(ticket.id)}
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

        <AddTicketPlanModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTicketPlan}
        />
        {/* Edit Service Modal */}
        {isEditModalOpen && selectedTicket && (
          <EditTicketPlanModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleUpdateTicket}
            ticket={selectedTicket}
          />
        )}
      </div>
    </CreatorDashboardLayout>
  );
};

export default CreatedTickets;
