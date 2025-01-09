import React, { useState, useEffect } from "react";
import { Text, Heading } from "../Text";
import { useNavigate } from "react-router-dom";
import { ButtonSmallPurple } from "../Buttons";
import { useSelector, useDispatch } from "react-redux";
import Paystack from "@paystack/inline-js";
import { showToast } from "../ShowToast";
import { options, cardData } from "../../data/upgradePricing";
import AxiosInterceptor from "../../component/AxiosInterceptor";
import { setEcosystemPlan } from "../../features/ecosystemPlan";

const Card = ({
  title,
  description,
  prices,
  buttonText,
  selectedTransaction,
  selectedInterval,
  handleSelectChange,
  handlePlanChange,
}) => {
  const userDetails = useSelector(
    (state) => state.auth.user || "UNKNOWN EMAIL"
  );

 
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedIntervals, setSelectedIntervals] = useState("monthly");

  const handleSelectChangeWrapper = (value) => {
    handleSelectChange(value);
  };

  const formatPriceForPaystack = (price) => {
    return price.toString().replace(/,/g, "");
  };

  const handleIntervalChange = (selectedInterval) => {
    // Set the interval text based on the selected interval
    if (selectedInterval === "Monthly") {
      setSelectedIntervals("monthly");
    } else if (selectedInterval === "6 Months") {
      setSelectedIntervals("Bi-annually");
    } else if (selectedInterval === "Annual") {
      setSelectedIntervals("annually");
    }
  };

  const handlePaystackPayment = (
    title,
    sizeAmount,
    selectedTransaction,
    selectedInterval
  ) => {
    let amountForPaystack = parseFloat(formatPriceForPaystack(sizeAmount));

    // Apply the interval-based calculation
    if (selectedInterval === "6 Months") {
      amountForPaystack *= 6;
    } else if (selectedInterval === "Annual") {
      amountForPaystack *= 12;
    }

    handleIntervalChange(selectedInterval);

    // Convert the amount to cents for Paystack
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
        console.log("Paystack response:", response);

        setLoading(true);
        const reference = response.trxref;
        const authFetch = AxiosInterceptor(accessToken, refreshToken);
        authFetch
          .put(`${import.meta.env.VITE_API_URL}/payment/update-subscription`, {
            reference,
            creatorId: userDetails?.creatorId,
            planType: title,
            sizeLimit: selectedTransaction,
            interval: selectedIntervals,
            ecosystemDomain: ecosystemDomain?.domain,
          })
          .then((response) => {
            console.log("Verification response:", response.data);
            if (response.data.message === "Subscription updated successfully") {
              showToast(response.data.message);
              if (response.data.planType) {
                dispatch(setEcosystemPlan(response.data.planType));
              }
              navigate("/creator/dashboard/Subscription");
            } else {
              showToast("Payment verification failed. Please try again.");
            }
          })
          .catch((error) => {
            showToast("An error occurred during payment verification.");
            console.error("Verification error:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      },
      onClose: () => {
        setLoading(false);
        showToast("You have canceled the transaction.");
      },
    });
  };

  const handleSignUp = (title) => {
    const selectedPrice = prices[selectedTransaction];
    const sizeAmount = selectedPrice?.Monthly;
    console.log("this is title", title);
    if (title && title !== "Lite" && sizeAmount && selectedTransaction) {
      handlePaystackPayment(
        title,
        sizeAmount,
        selectedTransaction,
        selectedInterval
      );
    } else {
      showToast("Invalid plan details");
    }
  };

  return (
    <div
      className="p-6 border rounded-lg shadow-md flex flex-col justify-between"
      style={{ height: "400px" }}
    >
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
            onChange={(e) => handleSelectChangeWrapper(e.target.value)}
            className="block w-full mt-1 border py-1 border-gray-300 rounded"
          >
            <option value="">Select</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <Text size="lg" weight="font-semibold h-[40px]">
          {prices[selectedTransaction]?.[selectedInterval] || "N/A"} /{" "}
          {selectedInterval}
        </Text>
        <ButtonSmallPurple
          className="mt-4"
          width=" w-full lg:w-full"
          onClick={() => handleSignUp(title)}
          disabled={loading}
        >
          {loading ? "Processing" : buttonText}
        </ButtonSmallPurple>
      </div>
    </div>
  );
};

const CardContainer = ({ setPriceInSubscription }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(
    options[0].value
  );

  const [selectedInterval, setSelectedInterval] = useState("Monthly");

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
      Plus: cardData.plans[0].prices[transaction]?.[interval] || "N/A",
      Pro: cardData.plans[1].prices[transaction]?.[interval] || "N/A",
      Extra: cardData.plans[2].prices[transaction]?.[interval] || "N/A",
    };

    setPriceInSubscription(pricesForSelectedTransaction);
  };

  // const userPlan = useSelector((state) => state.ecosystemPlan.plan);
  const userPlan = "Lite"

  return (
    <div>
      <div className="flex flex-col md:flex-row mb-4 justify-between items-center gap-4 font-body">
        <div className="border-[2px] border-primary3 p-4 rounded-md">
          <h1>Current Plan: {userPlan && userPlan} Plan </h1>
        </div>

        <div className="flex gap-3 text-sm lg:text-md">
          <label className="">Billing Period:</label>
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
      <div className="lg:space-x-4 overflow-x-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
          />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
