import React, { useEffect, useState } from "react";
import RegistrationLayout from "../../../layout/Creator/RegistrationLayout";
import SelectTemplateImage from "../../../assets/subscription.svg";
import { Text, Heading } from "../../../component/Text";
import CardContainer from "../../../component/Pricing/CardContainer";
import Accordion from "../../../component/Pricing/Accordion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();
  const userStep = useSelector((state) => state.auth?.user?.step);

  // useEffect(() => {
  //   if (userStep === 5) navigate("/auth/login");
  // }, [userStep, navigate]);

  const [selectedPrices, setSelectedPrices] = useState({
    Lite: "",
    Pro: "",
    Plus: "",
    Extra: "",
  });

  // const [handleSignUpProps, setHandleSignUpProps] = useState(() => {
  //   handleSignUp(title);
  // });

  const handlePriceUpdate = (prices) => {
    setSelectedPrices(prices);
  };

  return (
    <RegistrationLayout>
      <div className="lg:mx-12 mx-4 my-4 lg:my-10">
        <div className="bg-sec1 flex justify-between rounded-xl relative p-6">
          <div className="flex flex-col text-left">
            {/* Heading component */}
            <Heading
              level={2}
              size="2xl"
              weight="font-semibold"
              color="primary4"
            >
              Subscription
            </Heading>

            {/* Text component */}
            <Text color="gray-600" className="text-left text-[12px]">
              Compare and choose your preferred plan
            </Text>
          </div>

          {/* Image based on currentStep */}
          <img
            src={SelectTemplateImage}
            alt="Subscription"
            className="w-28 pr-6 right-0 bottom-0 absolute"
          />
        </div>

        <div className="overflow-x-auto h-screen mt-10">
          <div className="mt-10">
            <CardContainer
              setPriceInSubscription={handlePriceUpdate}
              //handleSignUp={handleSignUp}
            />
          </div>

          <div className="mt-10">
            <Accordion
              litePlan={selectedPrices.Lite}
              proPlan={selectedPrices.Pro}
              plusPlan={selectedPrices.Plus}
              extraPlan={selectedPrices.Extra}
              //handleSignUp={handleSignUp} 
            />
          </div>
        </div>
      </div>
    </RegistrationLayout>
  );
};

export default Subscription;
