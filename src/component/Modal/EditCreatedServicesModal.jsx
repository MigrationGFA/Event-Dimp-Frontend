import React, { useState, useRef } from "react";
import { Modal, Spinner } from "flowbite-react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabelImportant } from "../Label"; 
import { LongInputWithPlaceholder } from "../Inputs";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import { useImageUploader } from "../../helper/UploadImage";


const schema = yup.object().shape({
  name: yup.string().required("Service name is required"),
  shortDescription: yup
    .string()
    .required("Description is required")
    .max(200, "Description must be less than 200 characters"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  priceFormat: yup
    .string()
    .oneOf(["Hourly", "Fixed"], "Select a valid pricing format")
    .required("Pricing format is required"),
  deliveryTime: yup.string().required("Delivery time is required"),
});

const EditServiceModal = ({ service, onClose, onSave }) => {
  const {
    handleEditImageClick,
    handleImageChange,
    loadingImage,
  } = useImageUploader();
  const [imageUrl, setImageUrl] = useState(service.serviceImage);
  const fileInputRef = useRef(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: service.name,
      shortDescription: service.shortDescription,
      price: service.price,
      priceFormat: service.priceFormat,
      deliveryTime: service.deliveryTime,
      serviceImage: service.serviceImage,
    },
  });

  const handleFileUploadClick = () => fileInputRef.current.click();

  const handleImageUpload = async (e) => {
    const newImageUrl = await handleImageChange(e, "service", "image");
    if (newImageUrl) {
      setImageUrl(newImageUrl);
      setValue("serviceImage", newImageUrl);
    }
  };

  const handleSave = (data) => {
    onSave({ ...service, ...data });
  };

  return (
    <Modal show={true} onClose={onClose} size="2xl" popup={true} className="font-body backdrop-blur-md">
      <Modal.Header className="p-6">Edit Service</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
          {/* Service Name */}
          <div>
            <LabelImportant>Service Name</LabelImportant>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <LongInputWithPlaceholder
                  {...field}
                  type="text"
                  placeholder="Service Name"
                  className="w-full p-3 border border-ter5 shadow-sm rounded-md"
                />
              )}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          {/* Short Description */}
          <div>
            <LabelImportant>Short Description</LabelImportant>
            <Controller
              name="shortDescription"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Write a brief description of the service"
                  className="w-full p-3 border border-ter5 shadow-sm rounded-md resize-none"
                  rows="4"
                ></textarea>
              )}
            />
            {errors.shortDescription && <p className="text-red-500">{errors.shortDescription.message}</p>}
          </div>

          {/* Price */}
          <div>
            <LabelImportant>Price</LabelImportant>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <LongInputWithPlaceholder
                  {...field}
                  type="text"
                  placeholder="Price"
                  className="w-full p-3 border border-ter5 shadow-sm rounded-md"
                />
              )}
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>

          {/* Pricing Format */}
          <div>
            <LabelImportant>Pricing Format</LabelImportant>
            <Controller
              name="priceFormat"
              control={control}
              render={({ field }) => (
                <select {...field} className="w-full p-3 border border-ter5 shadow-sm rounded-md">
                  <option value="">Select Pricing Format</option>
                  <option value="Hourly">Hourly</option>
                  <option value="Fixed">Fixed</option>
                </select>
              )}
            />
            {errors.priceFormat && <p className="text-red-500">{errors.priceFormat.message}</p>}
          </div>

          {/* Delivery Time */}
          <div>
            <LabelImportant>Delivery Time</LabelImportant>
            <Controller
              name="deliveryTime"
              control={control}
              render={({ field }) => (
                <LongInputWithPlaceholder
                  {...field}
                  type="text"
                  placeholder="Delivery Time"
                  className="w-full p-3 border border-ter5 shadow-sm rounded-md"
                />
              )}
            />
            {errors.deliveryTime && <p className="text-red-500">{errors.deliveryTime.message}</p>}
          </div>

          {/* Service Image Upload */}
          <div>
            <LabelImportant>Service Image</LabelImportant>
            <div
              onClick={handleFileUploadClick}
              className="flex flex-col items-center justify-center border-2 border-dashed border-ter5 shadow-sm rounded-md p-6 cursor-pointer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12"
              >
                <path
                  opacity="0.5"
                  d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12 16V3M12 3L16 7.375M12 3L8 7.375"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="text-sec2 mb-2">Click to upload</span>
              {loadingImage ? (
                <Spinner />
              ) : (
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              )}
            </div>

            <LongInputWithPlaceholder
              value={imageUrl}
              readOnly
              placeholder="Image URL"
              className="w-full p-3 border border-ter5 shadow-sm rounded-md mb-4"
            />
            
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Service"
                className="w-full h-48 object-cover rounded-md mt-4"
              />
            )}
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-2">
            <ButtonSmallWhite onClick={onClose}>Cancel</ButtonSmallWhite>
            <ButtonSmallPurple type="submit">Save</ButtonSmallPurple>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditServiceModal;
