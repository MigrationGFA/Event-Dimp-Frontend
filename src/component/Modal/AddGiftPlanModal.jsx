import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  description: yup.string().required("Description is required"),
  currency: yup.string().required("Currency is required"),
  minAmount: yup.string().required("Minimum Amount is required"),
  maxAmount: yup.string().required("Maximum Amount is required"),
});

const AddGiftPlanModal = ({ isOpen, onClose, onSave }) => {
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

  const handleSave = async (data) => {
    setLoading(true);
    // Preparing the data for saving
    const giftPlanData = {
      name: data.name,
      currency: data.currency,
      minAmount: parseFloat(data.minAmount),
      maxAmount: parseFloat(data.maxAmount),
      description: data.description,
    };

    await onSave(giftPlanData);
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
        buttonText="See Your Gift Plans"
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
          <h2 className="text-lg font-bold text-purple-600">Add Gift Plan</h2>
          <p className="text-sm text-gray-500 mb-4">
            Kindly enter the details of the new gift plan
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

          {/* Description */}
          <div>
            <LabelImportant className="block text-sm font-medium mb-1">
              Description
            </LabelImportant>
            <Controller
              name="description"
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
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Min Amount */}
          <div>
            <LabelImportant className="block text-sm font-medium mb-1">
              Min Amount
            </LabelImportant>
            <Controller
              name="minAmount"
              control={control}
              render={({ field }) => (
                <LongInputWithPlaceholder
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="minimum Amount"
                  {...field}
                />
              )}
            />
            {errors.minAmount && (
              <p className="text-red-500 text-sm">{errors.minAmount.message}</p>
            )}
          </div>

          {/* Max Amount */}
          <div>
            <LabelImportant className="block text-sm font-medium mb-1">
              Max Amount
            </LabelImportant>
            <Controller
              name="maxAmount"
              control={control}
              render={({ field }) => (
                <LongInputWithPlaceholder
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="maximum Amount"
                  {...field}
                />
              )}
            />
            {errors.maxAmount && (
              <p className="text-red-500 text-sm">{errors.maxAmount.message}</p>
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

export default AddGiftPlanModal;
