import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LongInputWithPlaceholder } from "../Inputs";
import { LabelImportant } from "../Label";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import SuccessModal from "../../component/Modal/SuccessfulModal";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    price: yup
        .number()
        .typeError("Price must be a number")
        .required("Price is required"),
    benefits: yup
        .array()
        .of(yup.string().required("Benefit is required"))
        .min(1, "At least one benefit is required")
        .max(4, "You can add up to 4 benefits"),
    shortDescription: yup.string().required("Short Description is required"),
    currency: yup.string().required("Currency is required"),
});

const AddTicketPlanModal = ({ isOpen, onClose, onSave }) => {
    const navigate = useNavigate();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "benefits",
    });

    const handleSave = async (data) => {
        setLoading(true);
        data.adminType = "Ticket";
        await onSave(data);
        setLoading(false);
        setIsSuccessModalOpen(true);
        reset(); // Reset the form inputs
    };

    const handleSuccessModalClose = () => {
        setIsSuccessModalOpen(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center backdrop-blur-lg">
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={handleSuccessModalClose}
                message="Your changes have been saved successfully."
                buttonText="See Your Ticket Plans"
                onButtonClick={handleSuccessModalClose}
            />
            <div className="bg-white rounded-lg p-6 lg:w-[650px] shadow-lg max-h-[80vh] overflow-y-auto">
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
                    {/* Name */}
                    <div>
                        <LabelImportant className="block text-sm font-medium mb-1">
                            Name
                        </LabelImportant>
                        <Controller
                            name="name"
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
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Short Description */}
                    <div>
                        <LabelImportant className="block text-sm font-medium mb-1">
                            Short Description
                        </LabelImportant>
                        <Controller
                            name="shortDescription"
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
                        {errors.shortDescription && (
                            <p className="text-red-500 text-sm">
                                {errors.shortDescription.message}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <LabelImportant className="block text-sm font-medium mb-1">
                            Price
                        </LabelImportant>
                        <Controller
                            name="price"
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
                        {errors.price && (
                            <p className="text-red-500 text-sm">{errors.price.message}</p>
                        )}
                    </div>

                    {/* Currency */}
                    <div>
                        <LabelImportant className="block text-sm font-medium mb-1">
                            Currency
                        </LabelImportant>
                        <Controller
                            name="currency"
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
                        {errors.currency && (
                            <p className="text-red-500 text-sm">{errors.currency.message}</p>
                        )}
                    </div>

                    {/* Benefits */}
                    <div>
                        <LabelImportant className="block text-sm font-medium mb-1">
                            Benefits
                        </LabelImportant>
                        {fields.map((item, index) => (
                            <div key={item.id} className="flex items-center mb-2">
                                <Controller
                                    name={`benefits[${index}]`}
                                    control={control}
                                    render={({ field }) => (
                                        <LongInputWithPlaceholder
                                            type="text"
                                            className="w-full border rounded-lg px-3 py-2"
                                            placeholder="Type benefit here..."
                                            {...field}
                                        />
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="ml-2 text-red-500 hover:text-red-700 rounded-full w-5 h-5 bg-ter1"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        {errors.benefits && (
                            <p className="text-red-500 text-sm">{errors.benefits.message}</p>
                        )}
                        <button
                            type="button"
                            onClick={() => append("")}
                            className="mt-2 px-4 rounded-xl py-2 bg-purple-600 text-white"
                            disabled={fields.length >= 4}
                        >
                            Add Benefit
                        </button>
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
                            width="auto"
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
                            disabled={loading}
                        >
                            {loading && <Spinner size="sm" className="mr-2" />}
                            Save Changes
                        </ButtonSmallPurple>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTicketPlanModal;
