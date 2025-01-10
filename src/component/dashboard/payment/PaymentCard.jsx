import React from "react";
import TotalBalanceImg from "../../../assets/TotalBalance.svg";
import TotalTodayImg from "../../../assets/todaySale.svg";
import { Text } from "../../Text";
import { useSelector } from "react-redux";
const PaymentCard = ({earnings, todaySales}) => {
  const ecosystemType = useSelector((state) => state.ecosystemType.type);

  return (
    <div className="lg:w-8/12 ">
      <div className="lg:flex lg:space-x-4 lg:space-y-0 space-y-4">
        <div className="bg-ter5 p-9 rounded-lg flex items-center  w-full">
          <div className="bg-primary1  w-12 h-12 items-center justify-center flex rounded-full">
            <img src={TotalBalanceImg} alt="" />
          </div>
          <div className="ml-6">
            <Text size="[16px]" className=" text-ter4 mb-2">
             Wallet Balance
            </Text>
            <Text
              size="[28px]"
              weight="font-semibold"
              className=" text-primary2"
            >
             N{earnings?.totalEarnings?.Naira || 0.0}
            </Text>
          </div>
        </div>
        <div className="bg-ter2 p-9 rounded-lg flex items-center w-full">
          <div className="bg-ter3  w-12 h-12 items-center justify-center flex rounded-full">
            <img src={TotalTodayImg} alt="" />
          </div>
          <div className="ml-6">
            <Text size="[16px]" className=" text-ter4 mb-2">
              {ecosystemType} Today
            </Text>
            <Text
              size="[28px]"
              weight="font-semibold"
              className=" text-primary2"
            >
              N{todaySales?.totalAmount || 0.0}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
