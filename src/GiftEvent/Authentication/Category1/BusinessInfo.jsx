import { useForm } from "react-hook-form";
import { LongInputWithPlaceholder } from "../../../component/Inputs";
import { Text, Heading } from "../../../component/Text";
import { ButtonLongPurple } from "../../../component/Buttons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { creatorCreateEcosystem } from "../../../features/ecosystem";
import { useState, useEffect } from "react";
import { showToast } from "../../../component/ShowToast";
import { Country } from "country-state-city";
import api from "../../../api/verifyDomain";
import { statesAndLGAs } from "../../../data/StateAndLGA";

const BusinessInfo = ({ prevStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const creatorId = useSelector(
    (state) => state.auth.user?.creatorId || "UNKNOWN"
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [isDomainValid, setIsDomainValid] = useState(false);
  const [domainMessage, setDomainMessage] = useState("");
  const [domainErrorMessage, setDomainErrorMessage] = useState("");
  const [domainSuggestions, setDomainSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState(Object.keys(statesAndLGAs));
  const [lgas, setLgas] = useState([]);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setLgas(statesAndLGAs[selectedState] || []);
    setValue("lga", "");
  };

  useEffect(() => {
    const countriesList = Country.getAllCountries();
    setCountries(countriesList);

    setValue("country", "NG");
  }, [setValue]);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setValue("country", countryCode);
  };

  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    const subCategory = sessionStorage.getItem("SubCategory");
    if (subCategory) {
      setSelectedSubcategory(subCategory);
    }
  }, []);

  const handleWebsiteNameChange = (e) => {
    const businessNameValue = getValues("businessName");
    const domainValue = e.target.value.toLowerCase().replace(/[.\s,_-]/g, "");
    setValue("websiteName", domainValue);
    validateDomain(domainValue || businessNameValue);
  };

  const validateDomain = async (domainName) => {
    try {
      if (!accessToken || !refreshToken) return;

      setIsLoading(true);
      const response = await api.creatorVerifyDomain({
        domainName,
        accessToken,
        refreshToken,
      });

      if (response) {
        const { available, message, suggestions = [] } = response.data;

        if (message === "Domain name is available") {
          setIsDomainValid(true);
          setDomainMessage(message);
          setDomainErrorMessage("");
          setDomainSuggestions([]);
        } else if (message === "Domain name not available") {
          setIsDomainValid(false);
          setDomainErrorMessage(message);
          setDomainMessage("");
          setDomainSuggestions(suggestions);
        }
      }
    } catch (error) {
      console.error("Error validating domain:", error);
      setIsDomainValid(false);
      setDomainErrorMessage("Error checking domain availability.");
      setDomainMessage("");
      setDomainSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    sessionStorage.setItem("subCategory", data.businessSubcategory);
    try {
      setIsLoading(true);
      const response = await dispatch(
        creatorCreateEcosystem({
          accessToken,
          refreshToken,
          creatorId: creatorId,
          ecosystemName: data.businessName,
          ecosystemDomain: data.websiteName,
          targetAudienceSector: data.businessCategory,
          mainObjective: data.businessSubcategory,
          contact: "not available",
          ecosystemDescription: data.businessDescription,
          address:"nil",
          country: data.country,
          state: data.state,
          localGovernment: data.lga,
        })
      ).unwrap();

      if (response) {
        showToast("Form Submitted successfully", "success");
        navigate("/auth/select-website-design");
      }
    } catch (error) {
      console.error("Failed to create ecosystem:", error);
      showToast("Error submitting form", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-screen overflow-y-auto p-4">
      

      <form className="w-full font-body" onSubmit={handleSubmit(onSubmit)}>
        {/* Business Name Field */}
        <div className="mb-6">
          <label htmlFor="businessName" className="block mb-1">
            Business Name<span className="text-red-500">*</span>
          </label>
          <LongInputWithPlaceholder
            id="businessName"
            placeholder="What is the name of your Business?"
            className="border-sec4 bg-primary9 rounded p-2"
            {...register("businessName", {
              required: "Business Name is required",
              // onChange: (e) => {
              // //   setValue("websiteName", e.target.value);

              // },
              onChange: handleWebsiteNameChange,
            })}
          />
          {errors.businessName && (
            <span className="text-red-500">{errors.businessName.message}</span>
          )}
        </div>

        {/* Website Name Field */}
        <div className="mb-6">
          <label htmlFor="websiteName" className="block mb-1">
          Website Address<span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <LongInputWithPlaceholder
              id="websiteName"
              placeholder="Website address name"
              className="border-sec4 bg-primary9/85 rounded p-2 w-full border-r-0 flex-grow"
              {...register("websiteName", {
                required: "Website Address is required",
                onChange: handleWebsiteNameChange,
              })}
            />
            <span className="border border-sec4 bg-primary9/85 rounded p-[10px] border-l-0">
              .dimplified.com
            </span>
          </div>
          {domainErrorMessage && (
            <div className="mb-4 p-4 bg-red-600 text-white rounded-md shadow-md">
              {domainErrorMessage}
            </div>
          )}
          {domainMessage && (
            <div className="mb-4 p-4 bg-primary3 text-white rounded-md shadow-md">
              {domainMessage}
            </div>
          )}
          {domainSuggestions.length > 0 && (
            <ul className="mt-2 p-2 border border-blue-500 rounded-md bg-white shadow-lg">
              {domainSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="py-1 px-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors duration-200"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          {errors.websiteName && (
            <div className="mt-2 p-2 text-red-500 font-semibold">
              {errors.websiteName.message}
            </div>
          )}
        </div>

        <div className="w-full mb-6">
            <label htmlFor="country" className="block mb-1">
              Country<span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              className="w-full border-sec4 bg-primary9 rounded p-2"
              {...register("country", { required: "Country is required" })}
              onChange={handleCountryChange}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <span className="text-red-500">{errors.country.message}</span>
            )}
          </div>

        {/* State, and LGA Fields */}
        <div className="lg:flex gap-9 mb-6">
          

          <div className="w-full">
            <label htmlFor="state" className="block mb-1">
              State<span className="text-red-500">*</span>
            </label>
            <select
              id="state"
              className="w-full border-sec4 bg-primary9 rounded p-2"
              {...register("state", { required: "State is required" })}
              onChange={handleStateChange}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <span className="text-red-500">{errors.state.message}</span>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="lga" className="block mb-1">
              Local Government Area<span className="text-red-500">*</span>
            </label>
            <select
              id="lga"
              className="w-full border-sec4 bg-primary9 rounded p-2"
              {...register("lga", { required: "LGA is required" })}
            >
              <option value="">Select LGA</option>
              {lgas.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
            {errors.lga && (
              <span className="text-red-500">{errors.lga.message}</span>
            )}
          </div>
        </div>

        

        <div className="lg:flex gap-9 mb-6">
          <div className="w-full">
            <label htmlFor="businessCategory" className="block mb-1">
              Business Category<span className="text-red-500">*</span>
            </label>
            <select
              id="businessCategory"
              className="border border-sec4 bg-primary9/85 rounded p-2 w-full"
              {...register("businessCategory", {
                required: "Business Category is required",
              })}
            >
              <option value="Event Services">
                Event Services
              </option>
            </select>
            {errors.businessCategory && (
              <span className="text-red-500">
                {errors.businessCategory.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="businessSubcategory" className="block mb-1">
              Business Subcategory<span className="text-red-500">*</span>
            </label>
            <select
              id="businessSubcategory"
              className="border border-sec4 bg-primary9/85 rounded p-2 w-full"
              {...register("businessSubcategory", {
                required: "Business Subcategory is required",
              })}
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)} // Update the selected value
            >
              <option value="">-- Select SubCategory --</option>
              <option value=" Event Planning"> Event Planning</option>
              <option value="Wedding Planning">Wedding Planning</option>
              <option value="Catering Services">Catering Services</option>
              <option value="DJ Services">
              DJ Services
              </option>
              <option value="Live Band Services">Live Band Services</option>
              <option value="Photography Services">Photography Services</option>
              <option value="Videography Services">
              Videography Services
              </option>
              <option value="Florist Services">
              Florist Services
              </option>
              <option value="Event Rentals">
              Event Rentals
              </option>
              <option value="Lighting and Sound Services">
              Lighting and Sound Services
              </option>
              <option value="Event Coordination">
              Event Coordination
              </option>
              <option value="Bartending Services">
              Bartending Services
              </option>
              <option value="Security Services">
              Security Services
              </option>
              <option value="Decoration Services">
              Decoration Services
              </option>
              <option value="Venue Booking">
              Venue Booking
              </option>
              <option value="Invitation Design">Invitation Design</option>
              <option value="Event Staffing">Event Staffing</option>
              <option value="Childcare Services">
              Childcare Services
              </option>
              <option value="Entertainment Booking">Entertainment Booking</option>
              <option value=" Transportation Services">
              Transportation Services
              </option>
            </select>
            {errors.businessSubcategory && (
              <span className="text-red-500">
                {errors.businessSubcategory.message}
              </span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="businessDescription" className="block mb-1">
            Please describe your Business<span className="text-red-500">*</span>
          </label>
          <textarea
            id="businessDescription"
            className="w-full border border-sec4 bg-primary9 rounded p-2"
            placeholder="Describe what your Business does"
            rows={4}
            {...register("businessDescription", {
              required: "Business Description is required",
            })}
          ></textarea>
          {errors.businessDescription && (
            <span className="text-red-500">
              {errors.businessDescription.message}
            </span>
          )}
        </div>

        <div className="flex justify-between gap-4 mt-6 mb-40">
          {/* <ButtonSmallWhite onClick={prevStep} type="button">
            Back
          </ButtonSmallWhite> */}
          <ButtonLongPurple disabled={isLoading} type="submit">
            {isLoading ? "Submitting..." : "Submit"}
          </ButtonLongPurple>
        </div>
      </form>
    </div>
  );
};

export default BusinessInfo;
