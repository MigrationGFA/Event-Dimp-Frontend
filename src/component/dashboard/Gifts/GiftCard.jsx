import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ButtonSmallWhite } from "../../Buttons";

const schema = yup.object().shape({
    name: yup.string().required("Gift name is required"),
    currency: yup.string().required("Currency is required"),
    minAmount: yup.number().required("Minimum amount is required").positive("Amount must be positive"),
    maxAmount: yup.number().required("Maximum amount is required").positive("Amount must be positive"),
    description: yup.string().optional(),
});

const GiftCard = ({ gift, onEdit, onDelete }) => {
    console.log(gift)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { control, handleSubmit, reset, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: gift.name,
            currency: gift.currency,
            minAmount: gift.minAmount,
            maxAmount: gift.maxAmount,
            description: gift.description || "",
        },
    });

    const onSubmit = (data) => {
        const updatedGiftData = {
            giftId: gift._id,
            ...data,
        };
        onEdit(updatedGiftData);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="border border-gray-300 rounded-lg p-4 shadow-sm flex flex-col justify-between">
                <h3 className="font-semibold text-lg text-primary4">{gift.name}</h3>
                <div className="flex justify-between items-center">
                    <p className="text-sec5 font-bold text-xl my-2">
                        {gift.currency} {gift.minAmount} - {gift.maxAmount}
                    </p>
                </div>
                <p className="text-gray-600 text-sm mb-4">{gift.description}</p>
                <div className="flex space-x-2 mt-auto">
                    <ButtonSmallWhite
                        onClick={() => setIsModalOpen(true)}
                        className="text-sm font-medium text-ter6 bg-transparent rounded border-ter6 w-full hover:bg-primary3 hover:text-white"
                    >
                        Edit Gift Plan
                    </ButtonSmallWhite>
                    <ButtonSmallWhite
                        onClick={() => onDelete(gift._id)}
                        className="text-sm font-medium text-red-600 bg-transparent rounded border-red-600 w-full hover:bg-red-600 hover:text-white"
                    >
                        Delete Gift Plan
                    </ButtonSmallWhite>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-md">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[500px] md:w-[400px] lg:w-[500px] max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Edit Gift Plan</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Gift Name</label>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    )}
                                />
                                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Currency</label>
                                <Controller
                                    name="currency"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    )}
                                />
                                {errors.currency && <p className="text-red-600">{errors.currency.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Minimum Amount</label>
                                <Controller
                                    name="minAmount"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    )}
                                />
                                {errors.minAmount && <p className="text-red-600">{errors.minAmount.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Maximum Amount</label>
                                <Controller
                                    name="maxAmount"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    )}
                                />
                                {errors.maxAmount && <p className="text-red-600">{errors.maxAmount.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <Controller
                                    name="description"
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

GiftCard.propTypes = {
    gift: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
        minAmount: PropTypes.number.isRequired,
        maxAmount: PropTypes.number.isRequired,
        description: PropTypes.string,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default GiftCard;
