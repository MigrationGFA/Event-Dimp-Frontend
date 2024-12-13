import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateContent } from "../features/Template/editTemplate";

// for services
export const useImageUploader = () => {
  const fileInputRefs = useRef({});
  const [loadingImage, setLoading] = useState(false);

  const handleEditImageClick = (section, field) => {
    if (fileInputRefs.current[`${section}-${field}`]) {
      fileInputRefs.current[`${section}-${field}`].click();
    }
  };

  const handleImageChange = async (event, section, field) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", `${import.meta.env.VITE_UPLOAD_PRESET}`);
      formData.append("cloud_name", `${import.meta.env.VITE_CLOUD_NAME}`);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        setLoading(false);
        if (data.secure_url) {
          return data.secure_url; // Return the uploaded image URL
        }
      } catch (error) {
        setLoading(false);
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  };

  return {
    fileInputRefs,
    handleEditImageClick,
    handleImageChange,
    loadingImage,
  };
};

// for edit template
export const useImageEditor = () => {
  const dispatch = useDispatch();
  const fileInputRefs = useRef({});
  const [loadingImage, setLoading] = useState(false);

  const handleEditImageClick = (section, field) => {
    // Make sure the correct input is triggered
    if (fileInputRefs.current[`${section}-${field}`]) {
      fileInputRefs.current[`${section}-${field}`].click();
    }
  };

  const handleImageChange = async (event, section, field) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      // Prepare FormData for Cloudinary upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", `${import.meta.env.VITE_UPLOAD_PRESET}`);
      formData.append("cloud_name", `${import.meta.env.VITE_CLOUD_NAME}`);

      try {
        // Upload image to Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        console.log("this is cloudinery response", data);
        if (data.secure_url) {
          // Dispatch Cloudinary image URL to Redux Toolkit
          dispatch(
            updateContent({
              section: section,
              field: field,
              value: data.secure_url, // Use the Cloudinary URL
            })
          );
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  };

  return {
    fileInputRefs,
    handleEditImageClick,
    handleImageChange,
    loadingImage,
  };
};
