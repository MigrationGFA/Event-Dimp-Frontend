import React, {useEffect, useState} from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { Heading } from "../../component/Text";
import { ButtonSmallPurple, ButtonSmallWhite } from "../../component/Buttons";
import EditTemplate15 from "../EditTemplate/Blank-Template/EditBlankTemplate";
import { setTemplate } from "../../features/Template/editTemplate";
import { useSelector, useDispatch } from "react-redux";
import api from "../../api/Template";
import { showToast } from "../../component/ShowToast";
import { AlertDanger } from "../../component/Alert";
import { LoadingMany, LoadingSmall } from "../../component/LoadingSpinner";
import axios from "axios";

const EditWebsite = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cloading, setCLoading] = useState(false); // cloading for initial data fetch
  const [templateId, setTemplateId] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const details = useSelector(
    (state) => state.editTemplate.editcurrentTemplate
  );
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const userPlan = useSelector((state) => state.ecosystemPlan.plan);
  const userDomain = useSelector((state) => state.ecosystemDomain.domain);

  useEffect(() => {
    if (userDomain) {
      const fetchTemplateDetails = async () => {
        setCLoading(true);
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/getTemplate/${userDomain}`
          );
          const { templateDetails } = response.data;
          const { aboutUsDetails } = response.data;
          dispatch(setTemplate(templateDetails));
          setTemplateId(parseInt(templateDetails.templateId, 10));
          setUserDetails(aboutUsDetails);
          sessionStorage.setItem("ecoLogo", templateDetails.navbar.logo);
          sessionStorage.setItem("brand", templateDetails.navbar.brand);
        } catch (error) {
          console.error("Error fetching template details:", error);
        } finally {
          setCLoading(false);
        }
      };
      fetchTemplateDetails();
    }
  }, [userDomain, dispatch]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.editTemplate({
        ecosystemDomain: userDomain,
        navbar: details.navbar,
        hero: details.hero,
        aboutUs: details.aboutUs,
        Vision: details.Vision,
        Statistics: details.Statistics,
        Patrners: details.Patrners,
        Events: details.Events,
        Gallery: details.Gallery,
        LargeCta: details.LargeCta,
        Team: details.Team,
        Blog: details.Blog,
        Reviews: details.Reviews,
        contactUs: details.contactUs,
        faq: details.faq,
        faqStyles: details.faqStyles,
        footer: details.footer,
        accessToken,
        refreshToken,
      });
      showToast("Template Updated Successfully", "success");
    } catch (error) {
      showToast("Error Updating Template", "error");
    } finally {
      setLoading(false);
    }
  };

  const renderTemplate = () => {
    switch (templateId) {
      
      case 15:
        return (
          <EditTemplate15
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      default:
        return <div>Template not available</div>;
    }
  };
  return (
    <CreatorDashboardLayout>
    <div className="mt-5 relative bg-ter1 p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
      <Heading className="font-semibold text-[26px] text-primary4">
        Edit Template
      </Heading>
      <img
        src={EditTemplateImage}
        alt="Edit Template"
        className="w-32 pr-6 right-0 bottom-0 absolute"
      />
    </div>

    <div className="space-x-4 mt-6 px-4 md:px-0 ">
      {(userPlan === "Lite" || userPlan === "Plus") && (
        <AlertDanger
          title="Template Edit Plan Access"
          message={`You are currently on the ${userPlan} Plan, which prevents you from changing the logo or images. To gain access, upgrade to a Pro or Extra plan.`}
        />
      )}
      <div className="flex space-x-4 w-full mt-6 items-center justify-center lg:justify-end lg:w-10/12">
        <ButtonSmallWhite
          width="80px"
          padding="1"
          className="text-sm lg:text-lg"
        >
          Discard Changes
        </ButtonSmallWhite>
        <ButtonSmallPurple
          width="80px"
          disabled={loading || cloading}
          padding="1"
          onClick={handleSubmit}
          className="text-sm lg:text-lg"
        >
          {loading ? "Saving Changes" : "Save Changes"}
        </ButtonSmallPurple>
      </div>
    </div>

    <div className="mt-5">
      {cloading ? (
        <LoadingMany />
      ) : (
        <div className="">{renderTemplate()}</div>
      )}
    </div>
  </CreatorDashboardLayout>
  );
};

export default EditWebsite;
