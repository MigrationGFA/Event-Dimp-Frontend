import React, { useEffect, useState } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import { Heading, Text } from "../../component/Text";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import PaymentCard from "../../component/dashboard/payment/PaymentCard";
import WithdrawalCard from "../../component/dashboard/payment/WithdrawalCard";
import WithdrawDetails from "../../component/dashboard/payment/WithdrawDetails";
import PaymentChart from "../../component/dashboard/payment/PaymentChart";
import PaymentHistories from "../../component/dashboard/payment/PaymentHistories";
import { ButtonSmallPurple } from "../../component/Buttons";
import api from "../../api/DashboardApi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Payments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [earnings, setEarnings] = useState(null);
  const [withdrawHistory, setWithdrawHistory] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState(null);
  const [todaySales, setTodaySales] = useState(null);
  const [allTimeBooking, setAllTimeBooking] = useState(null);
  const [paymentCharts, setPaymentCharts] = useState(null);
  const [allBankDetails, setAllBankDetails] = useState(null);
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);

  const plan = useSelector((state) => state.ecosystemPlan.plan);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    getEarnings();
    getWithdrawHistory();
    getTransactionHistory();
    getTodaySales();
    getAllTimeBooking();
    getPaymentChart();
    getAllBankDetails();
  }, [
    ecosystemDomain, accessToken, refreshToken
  ]);

  const getEarnings = async () => {
    try {
      // Ensure tokens exist before making the API call
      if (!accessToken || !refreshToken) return;

      const response = await api.creatorEarning({
        ecosystemDomain,
        accessToken,
        refreshToken,
        dispatch,
        navigate,
      });
      setEarnings(response.data);
    } catch (error) {
      console.error("Could not get earnings:", error);
    }
  };

  const getWithdrawHistory = async () => {
    try {
      // Ensure tokens exist before making the API call
      if (!accessToken || !refreshToken) return;

      const response = await api.creatorWithdrawHistory({
        ecosystemDomain,
        accessToken,
        refreshToken,
        dispatch,
        navigate,
      });
      setWithdrawHistory(response.data);
    } catch (error) {
      console.error("Could not get withdraw History:", error);
    }
  };

  const getTransactionHistory = async () => {
    try {
      // Ensure tokens exist before making the API call
      if (!accessToken || !refreshToken) return;

      const response = await api.creatorTransactionHistory({
        ecosystemDomain,
        accessToken,
        refreshToken,
        dispatch,
        navigate,
      });
      setTransactionHistory(response.data);
    } catch (error) {
      console.error("Could not get withdraw History:", error);
    }
  };

  const getAllTimeBooking = async () => {
    try {
      // Ensure tokens exist before making the API call
      if (!accessToken || !refreshToken) return;

      const response = await api.creatorAllTimeBooking({
        ecosystemDomain,
        accessToken,
        refreshToken,
        dispatch,
        navigate,
      });
      setAllTimeBooking(response.data.response);
    } catch (error) {
      console.error("Could not get History History:", error);
    }
  };

  const getTodaySales = async () => {
    try {
      // Ensure tokens exist before making the API call
      if (!accessToken || !refreshToken) return;

      const response = await api.creatorTodaySales({
        ecosystemDomain,
        accessToken,
        refreshToken,
        dispatch,
        navigate,
      });
      setTodaySales(response.data);
    } catch (error) {
      console.error("Could not get withdraw History:", error);
    }
  };

  const getPaymentChart = async () => {
    try {
      // Ensure tokens exist before making the API call
      if (!accessToken || !refreshToken) return;

      const response = await api.creatorPaymentCharts({
        ecosystemDomain,
        accessToken,
        refreshToken,
        navigate,
        dispatch,
      });
      setPaymentCharts(response.data.response);
    } catch (error) {
      console.error("Could not get withdraw History:", error);
    }
  };

  const getAllBankDetails = async () => {
    try {
      // Ensure tokens exist before making the API call
      if (!accessToken || !refreshToken) return;

      const response = await api.creatorAllBankDetails({
        ecosystemDomain,
        accessToken,
        refreshToken,
        dispatch,
        navigate,
      });
      setAllBankDetails(response.data);
    } catch (error) {
      console.error("Could not get all Bank Details:", error);
    }
  };

  const handleUpgradePlan = () => {
    navigate("/creator/dashboard/Subscription");
  };

  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
          Payments
        </Heading>

        <img
          src={EditTemplateImage}
          alt=""
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>
      <div className="lg:flex items-center  justify-center lg:justify-between my-8 px-4 lg:px-0">
        <div>
          <Text className="lg:text-xl text-sm font-semibold text-primary2">
            Current Plan (
              {/* {plan}  */}
            Plan)
          </Text>

        </div>
        <div className="lg:4/12 ">
          <ButtonSmallPurple
            bg="primary3"
            className=" text-primary1 lg:py-3 py-1 lg:px-5 px-2 rounded-lg"
            onClick={handleUpgradePlan}
          >
            Upgrade Plan
          </ButtonSmallPurple>
        </div>
      </div>
      <div className="lg:flex w-full lg:space-x-4 space-y-5 lg:space-y-0  px-4 lg:px-0">
        <PaymentCard earnings={earnings} todaySales={todaySales} />
        <WithdrawalCard 
        allBankDetails={allBankDetails} earnings={earnings} 
        />
      </div>
      <div className="lg:flex lg:space-x-5 lg:space-y-0  w-full mt-6 px-4 lg:px-0">
        <WithdrawDetails
          allBankDetails={allBankDetails}
          getAllBankDetails={getAllBankDetails}
        />
        <PaymentChart
          paymentCharts={paymentCharts}
          allTimeBooking={allTimeBooking}
        />
      </div>

      <div className="px-4 lg:px-1">
        <PaymentHistories
          withdrawHistory={withdrawHistory}
          
        />
      </div>
    </CreatorDashboardLayout>
  );
};

export default Payments;
