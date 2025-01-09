import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabelImportant } from "../../Label";
import { LongInputWithPlaceholder } from "../../Inputs";
import { ButtonSmallPurple, ButtonSmallWhite } from "../../Buttons";
import { useNavigate } from "react-router-dom";
import { useImageUploader } from "../../../helper/UploadImage";
import { Spinner } from "flowbite-react";
import { useDispatch } from "react-redux";
import { addService } from "../../../features/CreateService";

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

const NewServiceForm = () => {
  const {
    fileInputRefs,
    handleEditImageClick,
    handleImageChange,
    loadingImage,
  } = useImageUploader();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      shortDescription: "",
      price: "",
      priceFormat: "",
      deliveryTime: "30 mins",
      serviceImage: "",
    },
  });
  

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    const newImageUrl = await handleImageChange(e, "service", "image");
    if (newImageUrl) {
      setImageUrl(newImageUrl);
      setValue("serviceImage", newImageUrl);
    }
  };

  const handleBack = () => {
    navigate("/creator/dashboard/edit-service");
  };

  const onSubmit = (data) => {
    dispatch(addService(data));
    navigate("/creator/dashboard/created-service");
  };

  return (
    <div>
      <div className="mx-5">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Service Name */}
          <div>
            <LabelImportant className="block text-ter13 text-sm font-medium mb-2">
              Service Name
            </LabelImportant>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <LongInputWithPlaceholder
                  {...field}
                  type="text"
                  placeholder="Kindly type the name of the service"
                  className="w-full p-3 border border-ter5 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary4"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Short Description */}
          <div>
            <LabelImportant className="block text-ter13 text-sm font-medium mb-2">
              Short Description
            </LabelImportant>
            <Controller
              name="shortDescription"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Write a brief description of the service"
                  className="w-full p-3 border border-ter5 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary4 resize-none"
                  rows="4"
                ></textarea>
              )}
            />
            {errors.shortDescription && (
              <p className="text-red-500">{errors.shortDescription.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <LabelImportant className="block text-ter13 text-sm font-medium mb-2">
              Price
            </LabelImportant>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <LongInputWithPlaceholder
                  {...field}
                  type="text"
                  placeholder="Price"
                  className="w-full p-3 border border-ter5 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary4"
                />
              )}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

           {/* Price
           <div className="w-full">
              <label className="block text-ter13 text-md font-medium mb-1 font-body">
              Home Service Price (optional)
              </label>
              <Controller
                name="homeServicePrice"
                control={control}
                render={({ field }) => (
                  <LongInputWithPlaceholder
                    {...field}
                    type="text"
                    placeholder="Home Service Price"
                    className="w-full p-3 border border-ter5 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary4"
                  />
                )}
              />
              {errors.homeServicePrice && (
                <p className="text-red-500">{errors.homeServicePrice.message}</p>
              )}
            </div> */}

          {/* Pricing Format */}
          <div>
            <LabelImportant className="block text-ter13 text-sm font-medium mb-2">
              Pricing Format
            </LabelImportant>
            <Controller
              name="priceFormat"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-3 border border-ter5 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary4"
                >
                  <option value="">Select Pricing Format</option>
                  <option value="Hourly">Hourly</option>
                  <option value="Fixed">Fixed</option>
                </select>
              )}
            />
            {errors.priceFormat && (
              <p className="text-red-500">{errors.priceFormat.message}</p>
            )}
          </div>

          {/* Delivery Time */}
          <div>
            <LabelImportant className="block text-ter13 text-sm font-medium mb-2">
              Delivery Time
            </LabelImportant>
            <Controller
              name="deliveryTime"
              control={control}
              render={({ field }) => (
                <LongInputWithPlaceholder
                  {...field}
                  type="text"
                  placeholder="Kindly enter the duration time in minutes"
                  className="w-full p-3 border border-ter5 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary4"
                />
              )}
            />
            {errors.deliveryTime && (
              <p className="text-red-500">{errors.deliveryTime.message}</p>
            )}
          </div>

          

          {/* Upload Image */}
          <div className="mt-6">
            <label className="block text-ter13 text-sm font-medium mb-2">
              Upload Image
            </label>
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
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M12 16V3M12 3L16 7.375M12 3L8 7.375"
                  stroke="#1C274C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
          </div>

          {imageUrl && (
            <div className="mt-4">
              <label className="block text-ter13 text-sm font-medium mb-2">
                Image URL
              </label>
              <LongInputWithPlaceholder
                type="text"
                value={imageUrl}
                readOnly
                className="w-full p-3 border border-ter5 shadow-sm rounded-md focus:outline-none bg-gray-100"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <ButtonSmallWhite
              type="button"
              className="text-primary4 border border-primary4 rounded-md px-4 py-2 hover:bg-sec1"
              onClick={handleBack}
            >
              Back
            </ButtonSmallWhite>
            <ButtonSmallPurple
              type="submit"
              className="bg-primary3 text-primary1 rounded-md px-6 py-2"
            >
              Save
            </ButtonSmallPurple>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewServiceForm;
