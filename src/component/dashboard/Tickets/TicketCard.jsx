import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ButtonSmallWhite } from "../../Buttons";

const schema = yup.object().shape({
    price: yup.string().required("Price is required"),
    benefits: yup
        .array()
        .of(yup.string().required("Benefit is required"))
        .min(1, "At least one benefit is required")
        .max(4, "No more than four benefits are allowed"),
    shortDescription: yup.string().optional(),
});

const TicketCard = ({ ticket, onEdit, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { control, handleSubmit, reset, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            price: ticket.price,
            benefits: ticket.benefits,
            shortDescription: ticket.shortDescription || "",
        },
    });

    const onSubmit = (data) => {
        const updatedTicketData = {
           ticketId: ticket._id,
            ...data,
        };
        onEdit(updatedTicketData);
        setIsModalOpen(false);
    };

    const handleAddBenefit = () => {
        const currentBenefits = getValues("benefits");
        if (currentBenefits.length < 4) {
            reset({ ...getValues(), benefits: [...currentBenefits, ""] });
        }
    };

    const handleRemoveBenefit = (index) => {
        const currentBenefits = getValues("benefits");
        if (currentBenefits.length > 1) {
            const newBenefits = currentBenefits.filter((_, i) => i !== index);
            reset({ ...getValues(), benefits: newBenefits });
        }
    };

    return (
        <>
            <div className="border border-gray-300 rounded-lg p-4 shadow-sm flex flex-col justify-between">
                <h3 className="font-semibold text-lg text-primary4">{ticket.name}</h3>
                <p className="text-sec5 font-bold text-xl my-2">{ticket.price}</p>
                <ul className="text-gray-600 mb-4">
                    {ticket?.benefits?.map((feature, index) => (
                        <li key={index} className="flex items-center my-3">
                            <div className="flex items-center space-x-2">
                                <span className="mr-2">➤</span>
                                <span>{feature}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex space-x-2 mt-auto">
                    <ButtonSmallWhite
                        onClick={() => setIsModalOpen(true)}
                        className="text-sm font-medium text-ter6 bg-transparent rounded border-ter6 w-full hover:bg-primary3 hover:text-white"
                    >
                        Edit Ticket Plan
                    </ButtonSmallWhite>
                    <ButtonSmallWhite
                        onClick={() => onDelete(ticket._id)}
                        className="text-sm font-medium text-red-600 bg-transparent rounded border-red-600 w-full hover:bg-red-600 hover:text-white"
                    >
                        Delete Ticket
                    </ButtonSmallWhite>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-md">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[500px] md:w-[400px] lg:w-[500px] max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Edit Ticket</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Price</label>
                                <Controller
                                    name="price"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    )}
                                />
                                {errors.price && <p className="text-red-600">{errors.price.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Benefits</label>
                                <Controller
                                    name="benefits"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            {field.value.map((benefit, index) => (
                                                <div key={index} className="flex items-center mb-2">
                                                    <input
                                                        value={benefit}
                                                        onChange={(e) => {
                                                            const newBenefits = [...field.value];
                                                            newBenefits[index] = e.target.value;
                                                            field.onChange(newBenefits);
                                                        }}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveBenefit(index)}
                                                        className="ml-2 px-2 py-1 bg-red-600 text-white rounded"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                            {errors.benefits && <p className="text-red-600">{errors.benefits.message}</p>}
                                            <button
                                                type="button"
                                                onClick={handleAddBenefit}
                                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                                            >
                                                Add Benefit
                                            </button>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Short Description</label>
                                <Controller
                                    name="shortDescription"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

TicketCard.propTypes = {
    ticket: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
        shortDescription: PropTypes.string,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TicketCard;
