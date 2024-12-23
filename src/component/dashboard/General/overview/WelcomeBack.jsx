// Welcome.js
import React from "react";
import EditTemplateImage from "../../../../assets/EditTemplategeneral.svg";
import { useSelector } from "react-redux";
import { Text, Heading } from "../../../../component/Text";
import { useNavigate } from "react-router-dom";
import Avatar from "../../../../assets/person.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "../../../ShowToast";

const Welcome = ({ earnings, bookingDetails }) => {
  const navigate = useNavigate();
  const name = useSelector((state) => state.auth.user);
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);

  const link = `https://${ecosystemDomain}.dimpified.com`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      showToast("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link:", error);
      showToast("Failed to copy link.");
    }
  };

 
  const handleWithdraw = () => {
    navigate("/creator/dashboard/payments");
  };

  const userImage = useSelector((state) => state.auth.user?.image);

  return (
    <div className="w-full lg:w-6/12 p-5 my-3 bg-sec1 rounded-xl relative flex items-center justify-between shadow-lg font-body">
      <div className="flex flex-wrap flex-col lg:space-y-2">
        <div className="lg:flex gap-2 mb-10">
          <div className="bg-primary8 rounded-full w-8 h-8">
            <img
              src={userImage ? userImage : Avatar}
              alt="user image"
              className="rounded-full"
            />
          </div>
          <div>
            <Heading
              level={2}
              size="xl"
              color="primary4"
              weight="font-semibold"
            >
              Welcome Back {name?.fullName || "unknown User"}!
            </Heading>
            <div className="flex items-center space-x-2">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {link}
              </a>
              <button
                onClick={handleCopy}
                className="text-gray-600 hover:text-gray-800"
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-3 lg:px-3">
          <div className="border-r-2 border-primary2 pr-1 lg:pr-5">
            <Heading
              level={3}
              size="3xl"
              weight="font-bold"
              className="font-Raj"
              color="black"
            >
              ₦ {earnings?.totalEarnings?.Naira || 0.0}
            </Heading>
            <div className="lg:flex items-center">
              <Text size="xs" color="gray-500">
                Total Earnings
              </Text>
              <button
                className="bg-primary10 px-4 ml-2 rounded-full text-primary1 py-1"
                onClick={handleWithdraw}
              >
                withdraw
              </button>
            </div>
          </div>
          <div>
            <Heading
              level={3}
              size="3xl"
              weight="font-bold"
              className="font-Raj"
              color="black"
            >
              {bookingDetails?.todayBookings.length || 0}
            </Heading>
            <Text size="xs" color="gray-500">
              Bookings today
            </Text>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 lg:bottom-[-13px] right-0">
        <img
          src={EditTemplateImage}
          alt="Person illustration"
          className="lg:w-32 lg:h-32 w-20"
        />
      </div>
    </div>
  );
};

export default Welcome;
