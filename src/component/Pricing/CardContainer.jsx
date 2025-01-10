import React, { useState, useEffect } from "react";
import { Text, Heading } from "../Text";
import { useNavigate } from "react-router-dom";
import { ButtonSmallPurple } from "../Buttons";
import { useSelector, useDispatch } from "react-redux";
import Paystack from "@paystack/inline-js";
import { showToast } from "../ShowToast";
import axios from "axios";
import { options, cardData } from "../../data/Pricing";
import api from "../../api/Subscription";
import api2 from "../../api/Template";
import { setEcosystemDomain } from "../../features/ecosystemDomain";
import { setEcosystemPlan } from "../../features/ecosystemPlan";
import { setEcosystemType } from "../../features/ecosystemType";
import AxiosInterceptor from "../../component/AxiosInterceptor";

const Card = ({
  title,
  description,
  prices,
  buttonText,
  selectedTransaction,
  selectedInterval,
  handleSelectChange,
  handlePlanChange,
  // handleSignUp: handleSignUpExport,
  
}) => {
  const userDetails = useSelector(
    (state) => state.auth.user || "UNKNOWN EMAIL"
  );
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userDetailEco, setUserDetailEco] = useState(null);
  const dispatch = useDispatch();
  const [selectedIntervals, setSelectedIntervals] = useState(null);

  const formatPriceForPaystack = (price) => price.toString().replace(/,/g, "");

  const handleIntervalChange = (selectedInterval) => {
    if (selectedInterval === "Monthly") {
      setSelectedIntervals("monthly");
      return "monthly";
    } else if (selectedInterval === "6 Months") {
      setSelectedIntervals("Bi-annually");
      return "Bi-annually";
    } else if (selectedInterval === "Annual") {
      setSelectedIntervals("annually");
      return "annually";
    }
  };



  const handlePaystackPayment = (
    title,
    sizeAmount,
    selectedTransaction,
    selectedInterval
  ) => {
    let amountForPaystack = parseFloat(formatPriceForPaystack(sizeAmount));

    if (selectedInterval === "6 Months") {
      amountForPaystack *= 6;
    } else if (selectedInterval === "Annual") {
      amountForPaystack *= 12;
    }

    const intervalForAPI = handleIntervalChange(selectedInterval);

    amountForPaystack *= 100;
    const popup = new Paystack();

    popup.newTransaction({
      key: import.meta.env.VITE_Paystack_PUBLIC_KEY,
      email: userDetails?.email,
      amount: amountForPaystack,
      currency: "NGN",
      payment_options: "card,mobilemoney,ussd",
      metadata: {
        custom_fields: [
          {
            display_name: userDetails?.fullName,
            variable_name: userDetails?.fullName,
            value: userDetails?.fullName,
          },
        ],
      },
      callback: (response) => {
        setLoading(true);
        const reference = response.trxref;
        const authFetch = AxiosInterceptor(accessToken, refreshToken);
        authFetch
          .post(`${import.meta.env.VITE_API_URL}/payment/verify-subscription`, {
            reference,
            creatorId: userDetails?.creatorId,
            planType: title,
            sizeLimit: selectedTransaction,
            interval: intervalForAPI,
            ecosystemDomain: userDetailEco?.ecosystemDomain,
          })
          .then((response) => {
            showToast(response.data.message);
            if (response.data.ecosystemDomain) {
              dispatch(setEcosystemDomain(response.data.ecosystemDomain));
            }
            if (response.data.ecosystemType) {
              dispatch(setEcosystemType(response.data.ecosystemType));
            }
            if (response.data.planType) {
              dispatch(setEcosystemPlan(response.data.planType));
            }
            navigate("/creator/dashboard/overview");
          })
          .catch(() => showToast("Payment verification failed."))
          .finally(() => setLoading(false));
      },
      onClose: () => showToast("Transaction canceled."),
    });
  };

  const getEcosystem = async () => {
    try {
      const response = await api2.getBusinessInfo({
        creatorId: userDetails.creatorId,
        accessToken,
        refreshToken,
      });
      setUserDetailEco(response.data.getEcosystem);
    } catch {
      console.log("Could not get business info");
    }
  };

  useEffect(() => {
    getEcosystem();
  }, []);

  const createFreeSubscription = async (title) => {
    setLoading(true);
    if (!userDetailEco || !userDetailEco.ecosystemDomain) {
      showToast("Ecosystem details are missing, try again later.");
      setLoading(false);
      return;
    }
    try {
      const ecosystemName = sessionStorage.getItem("ecosystemName");
      const response = await api.creatorFreeSubscribtion({
        creatorId: parseFloat(userDetails.creatorId),
        planType: title,
        sizeLimit: selectedTransaction,
        interval: "Monthly",
        ecosystemDomain: ecosystemName,
        accessToken,
        refreshToken,
      });
      setLoading(false);
      if (response.data.message === "Subscription verified successfully") {
        showToast(response.data.message);
        if (response.data.ecosystemDomain) {
          dispatch(setEcosystemDomain(response.data.ecosystemDomain));
        }
        if (response.data.ecosystemType) {
          dispatch(setEcosystemType(response.data.ecosystemType));
        }
        if (response.data.planType) {
          dispatch(setEcosystemPlan(response.data.planType));
        }
        
        sessionStorage.removeItem("ecosystemName")
        navigate("/creator/dashboard/general-overview");
      } else {
        showToast("Subscription verification failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.log("sub", error);
      showToast(error.response?.message || "An error occurred", "error");
    }
  };

  const handleSignUp = (title) => {
    const selectedPrice = prices[selectedTransaction]?.[selectedInterval];
    if (title === "Lite") {
      createFreeSubscription(title); // Trigger free subscription
    } else if (title && selectedPrice && selectedTransaction) {
      handlePaystackPayment(
        title,
        selectedPrice,
        selectedTransaction,
        selectedInterval
      );
    } else {
      //showToast("Invalid plan details");
    }
  };

  // useEffect(() => {
  //   if (handleSignUpExport) {
  //     handleSignUpExport(handleSignUp);
  //   }
  // }, [handleSignUpExport]);

  return (
    <div className="p-6 border rounded-lg shadow-md flex flex-col justify-between h-[400px]">
      <div>
        <Heading
          level={2}
          size="xl"
          color="primary3"
          className="mb-2 font-semibold"
        >
          {title}
        </Heading>
        <Text className="mb-4 text-[15px] h-[100px]">{description}</Text>

        <label className="block mb-2 font-body text-[13px] text-sec3 h-[80px]">
          Choose the number of transactions:
          <select
            value={selectedTransaction}
            onChange={(e) => handleSelectChange(e.target.value)}
            className="block w-full mt-1 border py-1 border-gray-300 rounded"
          >
            <option value="">Select</option>
            {title === "Lite" ? (
              <option value={options[0].value}>{options[0].label}</option>
            ) : (
              options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            )}
          </select>
        </label>
      </div>

      <div>
        <Text size="lg" weight="font-semibold h-[40px]">
          {prices[selectedTransaction]?.[selectedInterval] || "N/A"} /{" "}
          {selectedInterval}
        </Text>
        <ButtonSmallPurple
          className="mt-4 w-full lg:w-full"
          onClick={() => handleSignUp(title)}
          disabled={loading}
        >
          {loading ? "Processing" : buttonText}
        </ButtonSmallPurple>
      </div>
    </div>
  );
};

const CardContainer = ({ setPriceInSubscription, handleSignUp }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(
    options[0].value
  );
  const [selectedInterval, setSelectedInterval] = useState("Monthly");
 // const [signUpHandler, setSignUpHandler] = useState(null);

  const handleSelectChange = (value) => {
    setSelectedTransaction(value);
    updatePrices(value, selectedInterval);
  };

  const handlePlanChange = (interval) => {
    setSelectedInterval(interval);
    updatePrices(selectedTransaction, interval);
  };

  const updatePrices = (transaction, interval) => {
    const pricesForSelectedTransaction = {
      Lite: cardData.plans[0].prices[transaction]?.[interval] || "N/A",
      Plus: cardData.plans[1].prices[transaction]?.[interval] || "N/A",
      Pro: cardData.plans[2].prices[transaction]?.[interval] || "N/A",
      Extra: cardData.plans[3].prices[transaction]?.[interval] || "N/A",
    };

    setPriceInSubscription(pricesForSelectedTransaction);
  };

  // useEffect(() => {
  //   if (handleSignUp) {
  //     handleSignUp(signUpHandler);
  //   }
  // }, [handleSignUp, signUpHandler]);

  return (
    <div>
      <div className="flex flex-col md:flex-row mb-4 justify-end items-center gap-4 font-body">
        <label className="">Billing Period:</label>
        <div className="flex gap-3 text-sm lg:text-md">
          {["Monthly", "6 Months", "Annual"].map((period) => (
            <React.Fragment key={period}>
              <input
                type="radio"
                id={period.toLowerCase()}
                checked={selectedInterval === period}
                onChange={() => handlePlanChange(period)}
                className="cursor-pointer"
              />
              <label htmlFor={period.toLowerCase()} className="cursor-pointer">
                {period}
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="lg:space-x-4 overflow-x-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cardData.plans.map((plan, idx) => (
          <Card
            key={idx}
            title={plan.name}
            description={plan.description}
            prices={plan.prices}
            buttonText={plan.buttonText}
            selectedTransaction={selectedTransaction}
            selectedInterval={selectedInterval}
            handleSelectChange={handleSelectChange}
            handlePlanChange={handlePlanChange}
            //handleSignUp={setSignUpHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
