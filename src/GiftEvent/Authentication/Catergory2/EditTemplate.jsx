import React, { useEffect, useState } from "react";
import {
  ButtonSmallPurple,
  ButtonSmallWhite,
} from "../../../component/Buttons";
import PlaceHolderImage from "../../../assets/Placeholder.png";
import { useNavigate } from "react-router-dom";
import { setActiveSection } from "../../../features/Template/activeTemplate";
import { useSelector, useDispatch } from "react-redux";
// import BarberMordern from "../../Templates/PersonalCare/Barber/BarberModern";
// import HairstylistTemplate from "../../Templates/HairstylistTemplate";
// import Barber2 from "../../Templates/PersonalCare/Barber/Barber2";
import api from "../../../api/creatorApis";
import { showToast } from "../../../component/ShowToast";
// import { barber, HairSalon, MakeUp } from "../../../data/Services";
import api2 from "../../../api/Template";
import { setTemplate } from "../../../features/Template/mainTemplate";
import { LoadingMany, LoadingSmall } from "../../../component/LoadingSpinner";
import Toastify from "../../../component/Toastify";
import { AlertDanger } from "../../../component/Alert";


const EditTemplate = ({
  nextStep,
  currentStep,
  prevStep,
  isCompleted = [],
}) => {
  const steps = [0, 1];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [templateLoading, setTemplateLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [templateId, setTemplateId] = useState(null);

  const userStep = useSelector((state) => state.auth?.user?.step);

  useEffect(() => {
    if (userStep === 5 || userStep === 4 || userStep === 3)
      navigate("/auth/login");
  }, [userStep, navigate]);

  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const creatorId = useSelector((state) => state.auth.user?.creatorId);
  const content = useSelector((state) => state.mainTemplate.currentTemplate);

  useEffect(() => {
    const getId = Number(sessionStorage.getItem("templateId"));
    setTemplateId(getId);
  }, []);

  useEffect(() => {
    if (templateId) {
      getEcosystem();
      getTemplate(templateId);
    }
  }, [templateId]);

  const handleContinue = async () => {
    // setLoading(true);
    // const ecosystemDomain = userDetails.ecosystemDomain || "not available";
    // let selectedService = barber;
    // switch (templateId) {
    //   case 10:
    //     selectedService = barber;
    //     break;
    //   case 11:
    //     selectedService = HairSalon;
    //     break;
    //   case 12:
    //     selectedService = MakeUp;
    //     break;
    //   case 13:
    //     selectedService = barber;
    //   case 14:
    //     selectedService = barber;
    //     break;
    //   default:
    //     selectedService = barber;
    // }

    // try {
    //   const response = await api.createServices({
    //     creatorId,
    //     ecosystemDomain: ecosystemDomain,
    //     category: "Personal Care Service",
    //     subCategory: "Barber Shop",
    //     prefix: "I will",
    //     header: "give a nice hair cut of your choice",
    //     description:
    //       "The service offers you a nice and profession hair services",
    //     format: "Onsite",
    //     currency: "NGN",
    //     services: selectedService,
    //     accessToken,
    //     refreshToken,
    //     dispatch,
    //     navigate,
    //   });

    //   // showToast("Busines  site Submitted Successfully", "success")
    //   await handleSubmit();
    //   setLoading(false);
      navigate("/auth/subscription");
    // } catch (error) {
    //   setLoading(false);
    //   console.log("this is error", error);
    //   showToast("Error creating template");
    // }
  };

  const handleSubmit = async () => {
    // Add template details to FormData
    const ecosystemDomain = userDetails.ecosystemDomain || "not available";

    try {
      const response = await api2.createTemplate({
        //  templateData
        accessToken,
        refreshToken,
        creatorId: creatorId,
        ecosystemDomain: ecosystemDomain,
        templateId: templateId,
        navbar: content.navbar,
        hero: content.hero,
        aboutUs: content.aboutUs,
        Vision: content.Vision,
        Statistics: content.Statistics,
        Patrners: content.Patrners,
        Events: content.Events,
        Gallery: content.Gallery,
        LargeCta: content.LargeCta,
        Team: content.Team,
        Blog: content.Blog,
        Reviews: content.Reviews,
        contactUs: content.contactUs,
        faq: content.faq,
        faqStyles: content.faqStyles,
        footer: content.footer,
      });
      showToast("Busines  site Submitted Successfully", "success");
    } catch (error) {
      console.log(error);
      // showToast(error.response.data.message);
    }
  };

  const getTemplate = async () => {
    setTemplateLoading(true);

    try {
      const response = await api2.getTemplateDetails({
        templateId: templateId,
      });
      dispatch(setTemplate(response.data));
      setTemplateLoading(false);
    } catch (error) {
      setTemplateLoading(false);
      showToast("Error getting template information");
    }
  };

  const getEcosystem = async () => {
    try {
      // Ensure tokens exist before making the API call
      if (!accessToken || !refreshToken) return;
      const response = await api2.getBusinessInfo({
        creatorId,
      });
      setUserDetails(response.data.getEcosystem);
    } catch (error) {
      console.log("could not get business info");
    }
  };

  const renderTemplate = (templateId) => {
   
    // switch (templateId) {
    //   case 13:
    //     return <Barber2 userDetails={userDetails} />;
    //   case 10:
    //     return <BarberMordern userDetails={userDetails} />;
    //   case 11:
    //     return <HairstylistTemplate userDetails={userDetails} />;
    //   case 12:
    //     return <MakeupTemplate userDetails={userDetails} />;
    //   case 14:
    //     return <BarberPosh userDetails={userDetails} />;
    //   default:
    //     return <div>Invalid template</div>;
    // }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className=" lg:flex justify-between mt-8">
        {/* Stepper */}

        {/* Button Container */}
        <div className="flex space-x-4 lg:w-3/12 item-center justify-center ">
          <ButtonSmallWhite width="80px" onClick={prevStep}>
            Back
          </ButtonSmallWhite>
          <ButtonSmallPurple
            width="80px"
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? "Processing" : "Continue"}
          </ButtonSmallPurple>
        </div>

        <div className="flex items-center justify-center my-6 lg:w-9/12 mr-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-in-out h-2 rounded-full 
              ${
                currentStep === step
                  ? "w-8/12 bg-primary3"
                  : isCompleted[index]
                  ? "w-4/12 bg-sec5" // Completed step gets bg-sec5
                  : "w-4/12 bg-gray-300"
              } 
              ${index < steps.length - 1 ? "mr-4" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Scrollable Main Content Area */}
      <div className="mt-5 lg:mt-0">
        <AlertDanger
          title="How To Edit Template"
          message="You have selected this template, which can be customized in your
          dashboard once you've chosen a subscription plan"
        />
      </div>
      {templateLoading ? (
        <LoadingMany />
      ) : (
        <div className=" overflow-y-auto h-full mt-5 ">
          {/* {renderTemplate(templateId)} */}

          <img src={PlaceHolderImage} alt="" srcset=""  className="w-full h-full"/>
        </div>
      )}
    </div>
  );
};

export default EditTemplate;
