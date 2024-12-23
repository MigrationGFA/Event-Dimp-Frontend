import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LongInputWithPlaceholder } from "../Inputs";
import { LabelImportant } from "../Label";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import SuccessModal from "../../component/Modal/SuccessfulModal";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    ticketName: yup.string().required("Ticket Name is required"),
    ticketDescription: yup.string().required("Ticket Description is required"),
    ticketPrice: yup
        .number()
        .typeError("Ticket Price must be a number")
        .required("Ticket Price is required"),
    giftCurrency: yup.string().required("Gift Currency is required"),
});

const AddTicketPlanModal = ({ isOpen, onClose, onSave }) => {
    const navigate = useNavigate();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleSave = (data) => {
        onSave(data);
        setIsSuccessModalOpen(true); // Open success modal after saving
    };

    const handleSuccessModalClose = () => {
        setIsSuccessModalOpen(false);
        onClose();
        navigate("/creator/dashboard/created-tickets");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center backdrop-blur-lg">
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={handleSuccessModalClose}
                message="Your changes have been saved successfully."
                buttonText="See Your Gift Plans"
                onButtonClick={handleSuccessModalClose}
            />
            <div className="bg-white rounded-lg p-6 lg:w-[650px] shadow-lg overflow-y-auto lg:h-auto h-screen">
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-3xl"
                    >
                        &times;
                    </button>
                </div>
                <div className="mb-4 bg-ter1 p-4 rounded-lg">
                    <h2 className="text-lg font-bold text-purple-600">Add Ticket Plan</h2>
                    <p className="text-sm text-gray-500 mb-4">
                        Kindly enter the details of the new ticket plan
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
                    {/* Ticket Name */}
                    <div>
                        <LabelImportant className="block text-sm font-medium mb-1">
                            Ticket Name
                        </LabelImportant>
                        <Controller
                            name="ticketName"
                            control={control}
                            render={({ field }) => (
                                <LongInputWithPlaceholder
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder="Type here..."
                                    {...field}
                                />
                            )}
                        />
                        {errors.ticketName && (
                            <p className="text-red-500 text-sm">
                                {errors.ticketName.message}
                            </p>
                        )}
                    </div>

                    {/* Ticket Description */}
                    <div>
                        <LabelImportant className="block text-sm font-medium mb-1">
                            Ticket Description
                        </LabelImportant>
                        <Controller
                            name="ticketDescription"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder="Type here..."
                                    rows={5}
                                    {...field}
                                ></textarea>
                            )}
                        />
                        {errors.ticketDescription && (
                            <p className="text-red-500 text-sm">
                                {errors.ticketDescription.message}
                            </p>
                        )}
                    </div>

                    {/* Ticket Price */}
                    <div>
                        <LabelImportant className="block text-sm font-medium mb-1">
                            Ticket Price
                        </LabelImportant>
                        <Controller
                            name="ticketPrice"
                            control={control}
                            render={({ field }) => (
                                <LongInputWithPlaceholder
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder="20,000"
                                    {...field}
                                />
                            )}
                        />
                        {errors.ticketPrice && (
                            <p className="text-red-500 text-sm">
                                {errors.ticketPrice.message}
                            </p>
                        )}
                    </div>

                    {/* Gift Currency */}
                    <div>
                        <LabelImportant className="block text-sm font-medium mb-1">
                            Gift Currency
                        </LabelImportant>
                        <Controller
                            name="giftCurrency"
                            control={control}
                            render={({ field }) => (
                                <select
                                    className="w-full border rounded-lg px-3 py-2"
                                    {...field}
                                >
                                    <option value="">Select your currency</option>
                                    <option value="₦">₦</option>
                                    <option value="$">$</option>
                                    <option value="€">€</option>
                                    <option value="£">£</option>
                                </select>
                            )}
                        />
                        {errors.giftCurrency && (
                            <p className="text-red-500 text-sm">
                                {errors.giftCurrency.message}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end items-center gap-4 mt-6">
                        <ButtonSmallWhite
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            Discard
                        </ButtonSmallWhite>
                        <ButtonSmallPurple
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            Save Changes
                        </ButtonSmallPurple>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTicketPlanModal;
