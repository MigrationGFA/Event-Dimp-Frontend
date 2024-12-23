import React from "react";
import PropTypes from "prop-types";
import { ButtonSmallWhite } from "../../Buttons";

const TicketCard = ({ ticket, onEdit }) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow-sm flex flex-col justify-between">
            <h3 className="font-semibold text-lg text-primary4">{ticket.name}</h3>
            <p className="text-sec5 font-bold text-xl my-2">{ticket.price}</p>
            <ul className="text-gray-600 mb-4">
                {ticket.features.map((feature, index) => (
                    <li key={index} className="flex items-center my-3">
                        <div className="flex items-center space-x-2">
                            <span className="mr-2">➤</span>
                            <span>{feature}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <ButtonSmallWhite
                onClick={() => onEdit(ticket)}
                className="mt-auto text-sm font-medium text-ter6 bg-transparent rounded border-ter6 w-full hover:bg-primary3 hover:text-white"
            >
                Edit Ticket Plan
            </ButtonSmallWhite>
        </div>
    );
};

TicketCard.propTypes = {
    ticket: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        features: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    onEdit: PropTypes.func.isRequired,
};

export default TicketCard;
