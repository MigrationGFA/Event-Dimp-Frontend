import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../ShowToast";
import { setEcosystemType } from "../../features/ecosystemType";
import { setEcosystemDomain } from "../../features/ecosystemDomain";
import api from "../../api/DashboardApi";

const RecentlyCreatedWebsites = ({ websites, loading, getAllWebsites }) => {
  const dispatch = useDispatch();
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const creatorId = useSelector((state) => state.auth.user?.creatorId);

  const [isLoading, setIsLoading] = useState(loading);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [websiteToDelete, setWebsiteToDelete] = useState(null);
  const itemsPerPage = 3;

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const handleDeleteEcosystem = async () => {
    if (!websiteToDelete) return;
    setIsLoading(true);
    try {
      await api.creatorDeleteWebsite({
        creatorId,
        ecosystemDomain: websiteToDelete.ecosystemDomain,
        accessToken,
        refreshToken,
      });
      showToast("Website deleted successfully", "success");
      setDeleteModalOpen(false);
      getAllWebsites();
    } catch (error) {
      console.error(error);
      showToast("Failed to delete the website", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteModal = (website) => {
    setWebsiteToDelete(website);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setWebsiteToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleCopy = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      showToast("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link:", error);
      showToast("Failed to copy link.");
    }
  };

  const handleShare = async (link) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this website!",
          text: "Here's the link to a recently created website:",
          url: link,
        });
        showToast("Link shared successfully!");
      } catch (error) {
        console.error("Failed to share link:", error);
        showToast("Failed to share link.");
      }
    } else {
      showToast("Sharing is not supported on this device.");
    }
  };

  const handleDashboardSwitch = (type, ecosystemDomain) => {
    dispatch(setEcosystemDomain(ecosystemDomain));
    dispatch(setEcosystemType(type));
  };

  const totalPages = Math.ceil(websites?.ecosystems?.length / itemsPerPage);
  const currentWebsites = websites?.ecosystems?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPagination = () => {
    return (
      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-10 mx-4 p-2 lg:mx-0 bg-white rounded-lg">
      <h3 className="text-2xl font-semibold mb-6">Recently Created Websites</h3>
      <div className="space-y-6">
        {currentWebsites?.map((website) => (
          <div
            key={website._id}
            className="p-5 border rounded-lg bg-gray-50 shadow-md lg:flex items-start space-x-4"
          >
            <div className="w-10 h-10 flex items-center justify-center text-white font-bold rounded-full bg-purple-500">
              {website.type.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 space-y-5">
              <h4 className="text-lg font-bold">
                Name of Event: <span className="font-normal">{website.ecosystemName}</span>
              </h4>
              <p className="text-sm text-gray-600">
                Name of Client: <span className="font-medium">{website.ecosystemDomain}</span>
              </p>
              <div className="flex items-start space-x-2">
                <p className="text-sm text-gray-600 flex flex-wrap">
                  Website Address:{" "}
                  <a
                    href={`https://${website.ecosystemDomain}.dimpified.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0AAA10] underline break-words ml-1"
                  >
                    {`https://${website.ecosystemDomain}.dimpified.com`}
                  </a>
                </p>
                <button
                  onClick={() => handleCopy(`https://${website.ecosystemDomain}.dimpified.com`)}
                  className="text-gray-600 hover:text-gray-800"
                  aria-label="Copy website address"
                >
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </div>
              <p className="text-sm text-gray-600">
                Event Type: <span className="font-medium">{website.type}</span>
              </p>
            </div>
            <div className="flex flex-col space-y-6 mt-4 lg:mt-0">
              <button
                onClick={() => handleDashboardSwitch(website.type, website.ecosystemDomain)}
                className="px-4 py-2 bg-primary3 text-white text-sm font-medium rounded hover:bg-purple-600"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => handleShare(`https://${website.ecosystemDomain}.dimpified.com`)}
                className="px-4 py-2 border border-green-500 text-green-500 text-sm font-medium rounded hover:bg-green-50"
              >
                Share
              </button>
              <button
                onClick={() => openDeleteModal(website)}
                className="px-4 py-2 border border-red-500 text-red-500 text-sm font-medium rounded hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        {renderPagination()}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
            <h4 className="text-lg font-semibold mb-4">Confirm Deletion</h4>
            <p>
              Are you sure you want to delete the website{" "}
              <strong>{websiteToDelete?.ecosystemName}</strong>?
            </p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEcosystem}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentlyCreatedWebsites;
