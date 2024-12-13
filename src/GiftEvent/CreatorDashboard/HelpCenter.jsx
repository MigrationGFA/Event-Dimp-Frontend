import React, { useState, useEffect } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { Heading, Text } from "../../component/Text";
import { ButtonSmallPurple } from "../../component/Buttons";
import SupportRequestModal from "../../component/Modal/SupportRequestModal";
import api from "../../api/DashboardApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HelpCenter = () => {
  const [countsData, setCountsData] = useState(null); // Initializing as null instead of an array
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const itemsPerPage = 10;

  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  // Function to format date to "10 Oct 2024"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Function to format time to "10:30 AM"
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    getSupportBlock();
    getSupportTable();
  }, [
    //ecosystemDomain, accessToken, refreshToken
  ]);

  const getSupportBlock = async () => {
    try {
      if (!accessToken || !refreshToken) return;
      const response = await api.creatorSupportBlock({
        ecosystemDomain,
        accessToken,
        refreshToken,
      });
      setCountsData(response.data);
    } catch (error) {
      console.error("Could not get support block:", error);
    }
  };

  const getSupportTable = async () => {
    try {
      if (!accessToken || !refreshToken) return;
      const response = await api.creatorSupportTable({
        ecosystemDomain,
        accessToken,
        refreshToken,
      });
      setTableData(response.data.supportRequestsByDomain);
    } catch (error) {
      console.error("Could not get support block:", error);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle modal open/close
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
          Help Center
        </Heading>
        <img
          src={EditTemplateImage}
          alt="Edit Template"
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>
      <div className="mt-6 space-y-7 mx-5">
        <Text className="text-ter13 text-left">
          Keep track of your previous support tickets or create new submit
          support requests.
        </Text>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-primary1 rounded-md shadow p-4 flex flex-col items-start">
            <Heading
              level={2}
              weight="font-medium"
              className="text-sm font-medium text-ter13"
            >
              Total Support
            </Heading>
            <Heading
              level={3}
              weight="font-bold"
              className="text-3xl font-bold text-ter13 mt-8"
            >
              {countsData?.totalSupport || 0}
            </Heading>
          </div>
          <div className="bg-primary1 rounded-md shadow p-4 flex flex-col items-start">
            <Heading
              level={2}
              weight="font-medium"
              className="text-sm font-medium text-ter13"
            >
              Pending Request
            </Heading>
            <Heading
              level={3}
              weight="font-bold"
              className="text-3xl font-bold text-ter13 mt-8"
            >
              {countsData?.pendingSupport || 0}
            </Heading>
          </div>

          <div className="bg-primary1 rounded-md shadow p-4 flex flex-col items-start">
            <Heading
              level={2}
              weight="font-medium"
              className="text-sm font-medium text-ter13"
            >
              Completed Request
            </Heading>
            <Heading
              level={3}
              weight="font-bold"
              className="text-3xl font-bold text-ter13 mt-8"
            >
              {countsData?.completedSupport || 0}
            </Heading>
          </div>
          <div className="bg-primary1 rounded-md shadow p-4 flex flex-col items-start">
            <Heading
              level={2}
              weight="font-medium"
              className="text-sm font-medium text-ter13"
            >
              Support Request
            </Heading>
            <Heading
              level={3}
              weight="font-bold"
              className="text-3xl font-bold text-ter13 mt-8"
            >
              {countsData?.totalSupport || 0}
            </Heading>
          </div>
        </div>

        {/* Support Request Button */}
        <div className="flex justify-end">
          <ButtonSmallPurple
            onClick={handleModalToggle}
            className="bg-primary3 text-primary1 py-2 px-4 rounded-md hover:bg-primary3"
          >
            Support Request
          </ButtonSmallPurple>
        </div>

        {/* Support Requests Table */}
        <div className="bg-primary1 rounded-md shadow overflow-x-auto p-3">
          <Heading
            level={2}
            weight="font-bold"
            className="text-2xl font-bold mb-4 px-4"
          >
            Support Requests
          </Heading>
          {tableData.length === 0 ? (
            <div className="flex justify-center items-center p-10">
              <Text className="text-ter6">No Support Request found.</Text>
            </div>
          ) : (
            <table className="min-w-full bg-primary1">
              <thead>
                <tr>
                  {["ID", "Reason", "Message", "Date", "Time", "Status"].map(
                    (heading, index) => (
                      <th
                        key={index}
                        className="text-left py-3 px-4 text-ter13 font-semibold text-sm border-b"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 px-4 border-b">#{item.id}SR</td>
                    <td className="py-3 px-4 border-b">{item.reason}</td>
                    <td className="py-3 px-4 border-b">{item.message}</td>
                    <td className="py-3 px-4 border-b">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {formatTime(item.createdAt)}
                    </td>
                    <td className="py-3 px-4 border-b">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="text-ter13 bg-sec1 p-2 rounded-md hover:bg-sec2 disabled:opacity-50"
          >
            &#8592;
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="text-ter13 bg-sec1 p-2 rounded-md hover:bg-sec2 disabled:opacity-50"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Support Request Modal */}
      <SupportRequestModal
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        getSupportBlock={getSupportBlock}
        getSupportTable={getSupportTable}
      />
    </CreatorDashboardLayout>
  );
};

export default HelpCenter;
