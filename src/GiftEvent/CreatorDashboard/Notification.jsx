import React, { useState, useEffect } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { Heading, Text } from "../../component/Text";
import { ButtonSmallPurple } from "../../component/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { faFilter, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "flowbite-react";
// import api from "../../api/DashboardApi";
import { showToast } from "../../component/ShowToast";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const ITEMS_PER_PAGE = 8;

  // const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  // const { accessToken, refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    getNotification();
  }, [
    //accessToken, refreshToken, ecosystemDomain
  ]);

  const getNotification = async () => {
    try {
      if (!accessToken || !refreshToken) return;

      const response = await api.creatorNotification({
        ecosystemDomain,
        accessToken,
        refreshToken,
      });
      setNotifications(response.data.message);
    } catch (error) {
      console.error("Could not get notifications:", error);
    }
  };

  const handleSelectNotification = async (notification) => {
    if (!notification.view) {
      await handleMarkAsRead(notification._id);
    }
    setSelectedNotification(notification);
    if (window.innerWidth < 1024) {
      setIsMobileModalOpen(true); 
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const response = await api.creatorMarkAsReadNotification({
        accessToken,
        refreshToken,
        ecosystemDomain,
        notificationId,
      });
      if (response.status === 200) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((n) =>
            n._id === notificationId ? { ...n, view: true } : n
          )
        );
        showToast(response.data.message);
      } else {
        console.error("Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      showToast(error.response.data.message);
    }
  };

  const handleBack = () => {
    navigate("/creator/dashboard/overview");
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const filteredNotifications = notifications.filter((notification) =>
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentNotifications = filteredNotifications.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 w-full p-4 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[20px] lg:text-[26px] text-primary4">
          Notifications
        </Heading>
        <img
          src={EditTemplateImage}
          alt=""
          className="w-24 lg:w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 mt-10 px-2">
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 pl-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <ButtonSmallPurple
          className="bg-purple-500 text-white w-full sm:w-auto px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition"
          onClick={handleBack}
        >
          Back to Dashboard
        </ButtonSmallPurple>
      </div>

      <div className="mt-10 px-3 md:px-6 lg:px-1 min-h-screen flex flex-col lg:flex-row gap-8">
        <div className={`flex-1 bg-white shadow-lg rounded-lg p-4 lg:p-6 ${selectedNotification ? "lg:w-1/2" : "w-full"}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <button className="bg-gray-100 px-4 py-2 rounded-lg shadow text-gray-600 flex items-center">
              <FontAwesomeIcon icon={faFilter} className="mr-2" /> Filter
            </button>
          </div>

          <div className="space-y-4">
            {currentNotifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() => handleSelectNotification(notification)}
                className="flex items-start space-x-3 border-b pb-4 cursor-pointer"
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-10 h-10 text-gray-600" />
                <div className="flex-1">
                  <Heading className="text-sm font-semibold">
                    {notification.type}
                  </Heading>
                  <Text className="text-gray-600 text-sm">
                    {notification.message.length > 50
                      ? `${notification.message.slice(0, 50)}...`
                      : notification.message}
                  </Text>
                  <Text className="text-xs text-gray-400 mt-1">
                    {new Date(notification.date).toLocaleString()}
                  </Text>
                </div>
                <div className="flex flex-col space-y-6 items-center justify-center">
                  {!notification.view ? (
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1"></div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1"></div>
                  )}
                  <ButtonSmallPurple
                    className="text-primary1 hidden lg:block"
                    padding="1"
                    width="w-16"
                    height="10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNotification(notification);
                    }}
                  >
                    View
                  </ButtonSmallPurple>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-2 mt-6">
            {[...Array(Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE))].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? "bg-purple-500 text-white" : "bg-gray-200"}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {selectedNotification && window.innerWidth >= 1024 && (
          <div className="flex-1 bg-white shadow-lg rounded-lg p-4 lg:p-6 lg:w-1/2">
            <Heading className="text-lg font-semibold mb-4">
              {selectedNotification.type}
            </Heading>
            <Text className="text-gray-700 text-sm mb-4">
              {selectedNotification.message}
            </Text>
            <Text className="text-xs text-gray-400 mb-4">
              {new Date(selectedNotification.date).toLocaleString()}
            </Text>
            <button
              onClick={() => setSelectedNotification(null)}
              className="bg-primary3 text-primary1 mt-4 px-4 py-2 rounded-lg shadow"
            >
              Close
            </button>
          </div>
        )}
      </div>

      <Modal show={isMobileModalOpen} onClose={() => setIsMobileModalOpen(false)} className="font-body backdrop-blur-md">
        <Modal.Header>{selectedNotification?.type}</Modal.Header>
        <Modal.Body>
          <Text className="text-gray-700 text-sm mb-4">
            {selectedNotification?.message}
          </Text>
          <Text className="text-xs text-gray-400 mb-4">
            {selectedNotification && new Date(selectedNotification.date).toLocaleString()}
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => setIsMobileModalOpen(false)}
            className="bg-primary3 text-primary1 px-4 py-2 rounded-lg shadow"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </CreatorDashboardLayout>
  );
};

export default Notification;
