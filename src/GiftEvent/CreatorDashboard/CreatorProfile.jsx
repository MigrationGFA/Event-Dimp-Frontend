import React, { useState, useEffect } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { Heading } from "../../component/Text";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Country } from "country-state-city";
import { statesAndLGAs } from "../../data/StateAndLGA";
import { LabelImportant } from "../../component/Label";
import { LongInputWithPlaceholder } from "../../component/Inputs";
import { ButtonSmallPurple } from "../../component/Buttons";
// import api from "../../api/DashboardApi";
import { useSelector } from "react-redux";
import { showToast } from "../../component/ShowToast";
import { Text } from "../../component/Text";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Full Name is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
});

const CreatorProfile = () => {
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");
  const [profileImageFile, setProfileImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // const creatorId = useSelector((state) => state.auth.user?.creatorId);
  // const ProfileName = useSelector((state) => state.auth.user?.fullName);
  // const ProfileEmail = useSelector((state) => state.auth.user?.email);
  // const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState(Object.keys(statesAndLGAs));
  const [localGovernments, setLocalGovernments] = useState([]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file);
      await handleProfileImageUpdate(file);
    }
  };
  
  const handleProfileImageUpdate = async (file) => {
    if (!file || !creatorId) return;
  
    try {
      const response = await api.creatorUpdateProfileImage({
        accessToken,
        refreshToken,
        creatorId: parseFloat(creatorId), 
        image: file, 
      });
      if (response.status === 200) {
        showToast(response.data.message, "success");
        fetchProfile();
      } else {
        showToast("Profile image update failed", "error");
      }
    } catch (error) {
      console.error("Failed to update profile image:", error);
      showToast("Failed to update profile image: " + error.message, "error");
    }
  };

  const fetchProfile = async () => {
    if (!accessToken || !refreshToken || !creatorId) return;
  
    try {
      const response = await api.creatorProfile({
        creatorId,
        accessToken,
        refreshToken,
      });
  
      const {
        fullname,
        dateOfBirth,
        gender,
        phoneNumber,
        state,
        localGovernment,
        country,
        profileImage // Profile image from API
      } = response.data.profile;
  
      setValue("fullname", fullname || "");
      setValue("dateOfBirth", dateOfBirth ? new Date(dateOfBirth).toISOString().split("T")[0] : "");
      setValue("gender", gender || "");
      setValue("phoneNumber", phoneNumber || "");
      setValue("country", country || "");
  
      if (profileImage) {
        setProfileImage(profileImage); // Update profile image state
      }
  
      if (state) {
        setValue("state", state);
        const lgas = statesAndLGAs[state] || [];
        setLocalGovernments(lgas);
        if (localGovernment && lgas.includes(localGovernment)) {
          setValue("localGovernment", localGovernment);
        } else {
          setValue("localGovernment", "");
        }
      }
    } catch (error) {
      console.error("Could not get profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
    setCountries(Country.getAllCountries());
  }, [
    //setValue, accessToken, refreshToken, creatorId
  ]);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setValue("state", selectedState);
    setLocalGovernments(statesAndLGAs[selectedState] || []);
  };

  const handleCountryChange = (e) => {
    setValue("country", e.target.value);
  };

  const onSubmit = async (data) => {
    const profileData = {
      creatorId,
      fullname: data.fullname,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      state: data.state,
      localGovernment: data.localGovernment || "",
      country: data.country,
    };

    try {
      const response = await api.creatorUpdateProfile(profileData);
      if (response.status === 200) {
        showToast(response.data.message, "success");
        fetchProfile();
      } else {
        showToast("Profile update failed", "error");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };


  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
          Profile
        </Heading>
        <img
          src={EditTemplateImage}
          alt=""
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>
      <div className="mt-16">
        <div className="flex flex-col lg:flex-row items-center lg:text-center text-left">
          <div className="relative group">
            <label htmlFor="profileImageUpload" className="cursor-pointer">
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-2 object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-primary2 bg-opacity-50 rounded-full text-primary1">
                Change
              </span>
            </label>
            <input
              type="file"
              id="profileImageUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="lg:ml-6 text-center lg:text-left">
            <Text className="text-lg font-semibold">{
            // ProfileName || 
            "Unknown User"}</Text>
            <Text className="text-ter13">{
            //ProfileEmail ||
            "example @ example.com" }</Text>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-5 space-y-10 items-center gap-8 mt-8 ">
          {/* Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            <div>
              <LabelImportant className="text-ter13">Full Name</LabelImportant>
              <LongInputWithPlaceholder
                {...register("fullname")}
                placeholder="Your Full Name"
                className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3"
              />
              {errors.fullname && (
                <p className="text-ter7">{errors.fullname.message}</p>
              )}
            </div>

            <div>
              <LabelImportant className="text-ter12">
                Date of Birth
              </LabelImportant>
              <LongInputWithPlaceholder
                type="date"
                {...register("dateOfBirth")}
                className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3"
              />
              {errors.dateOfBirth && (
                <p className="text-ter7">{errors.dateOfBirth.message}</p>
              )}
            </div>

            <div>
              <LabelImportant className="text-ter12">Gender</LabelImportant>
              <select
                {...register("gender")}
                className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-ter7">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <LabelImportant className="text-ter12">
                Phone Number
              </LabelImportant>
              <LongInputWithPlaceholder
                {...register("phoneNumber")}
                placeholder="Your Phone Number"
                className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3"
              />
              {errors.phoneNumber && (
                <p className="text-ter7">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div>
              <LabelImportant className="text-ter12">State</LabelImportant>
              <select
                {...register("state")}
                onChange={handleStateChange}
                className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-ter7">{errors.state.message}</p>
              )}
            </div>

            <div>
              <LabelImportant className="text-ter12">Country</LabelImportant>
              <select
                {...register("country")}
                onChange={handleCountryChange}
                className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-ter7">{errors.country.message}</p>
              )}
            </div>
          </div>
          <div className="max-w-4xl">
            <div>
              <LabelImportant className="text-ter12">
                Local Government
              </LabelImportant>
              <select
                {...register("localGovernment")}
                className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3"
              >
                <option value="">Select Local Government</option>
                {localGovernments.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ButtonSmallPurple type="submit" className="mt-8">
            Save Profile
          </ButtonSmallPurple>
        </div>
      </form>
    </CreatorDashboardLayout>
  );
};

export default CreatorProfile;
