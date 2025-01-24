import React, { useEffect, useState } from "react";
import { Heading } from "../../Text";
import { ButtonSmallPurple, ButtonSmallWhite } from "../../Buttons";
import { LongInputWithPlaceholder } from "../../Inputs";
import { useSelector } from "react-redux";
import api from "../../../api/DashboardApi";
import { showToast } from "../../ShowToast";

const AttendeeManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false);

  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const ecosystemType = useSelector((state) => state.ecosystemType.type);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllAttendees();
  }, [accessToken, refreshToken, ecosystemDomain]);

  const getAllAttendees = async () => {
    setLoading(true);
    try {
      const response = await api.creatorAttendeeActivity({
        accessToken,
        refreshToken,
        ecosystemDomain,
      });
      setAttendees(response.data.attendees || []);
    } catch (error) {
      console.error("Error fetching attendees:", error);
      showToast("Failed to fetch attendees. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (attendee) => {
    setSelectedAttendee(attendee);
    setIsModalOpen(true);
  };

  const handleInputChange = (field, value) => {
    setSelectedAttendee((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedAttendee) return;
    setLoading(true);

    try {
      await api.creatorUpdateAttendees({
        accessToken,
        refreshToken,
        seat: selectedAttendee.seat,
        table: selectedAttendee.table,
        fullName: selectedAttendee.fullName,
        attendeeId: selectedAttendee._id,
        status: selectedAttendee.status,
      });
      showToast("Attendee updated successfully!", "success");
      getAllAttendees(); // Refresh the attendee list
    } catch (error) {
      console.error("Error updating attendee:", error);
      showToast(error.message || "Failed to update attendee. Please try again.", "error");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAttendee(null);
  };

  const generateCustomID = (index) => {
    const prefix = "ATM";
    const suffix = "TN";
    const paddedIndex = String(index + 1).padStart(3, "0");
    return `${prefix}${paddedIndex}${suffix}`;
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 mb-5">
      <div className="lg:flex justify-between mt-10 items-center mb-5">
        <Heading className="text-lg font-semibold mb-4">
          Attendee Management
        </Heading>
        <input
          type="text"
          placeholder="Search"
          className="lg:w-4/12 mb-4 p-2 border rounded-lg"
        />
      </div>

      <div className="overflow-auto">
        {loading ? (
          <p className="text-center py-5">Loading attendees...</p>
        ) : attendees.length > 0 ? (
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="px-4">ID</th>
                <th className="px-4">Name</th>
                <th className="px-4">Amount</th>
                <th className="px-4">Messages</th>
                <th className="px-4">Table No</th>
                <th className="px-4">Seat No</th>
                <th className="px-4">Status</th>
                {ecosystemType === "Gift" && <th className="px-4">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee, index) => (
                <tr key={attendee._id} className="border-b">
                  <td className="py-2">{generateCustomID(index)}</td>
                  <td className="py-2">{attendee.fullName}</td>
                  <td className="py-2">{attendee.amountPaid}</td>
                  <td className="py-2">{attendee.message}</td>
                  <td className="py-2">{attendee.table}</td>
                  <td className="py-2">{attendee.seat}</td>
                  <td className="py-2">{attendee.status}</td>
                  {ecosystemType === "Gift" && (
                    <td className="py-2">
                      <button
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                        onClick={() => handleUpdateClick(attendee)}
                      >
                        Update
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-5">No attendees found.</p>
        )}
      </div>

      {isModalOpen && selectedAttendee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Update Attendee Information
              </h2>
              <button
                onClick={closeModal}
                className="text-primary2 font-bold bg-sec2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary6 transition"
              >
                &times;
              </button>
            </div>

            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <LongInputWithPlaceholder
                  type="text"
                  value={selectedAttendee.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Assign Table
                </label>
                <LongInputWithPlaceholder
                  type="text"
                  value={selectedAttendee.table}
                  onChange={(e) => handleInputChange("table", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Assign Seat
                </label>
                <LongInputWithPlaceholder
                  type="text"
                  value={selectedAttendee.seat}
                  onChange={(e) => handleInputChange("seat", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Attendance Status
                </label>
                <select
                  value={selectedAttendee.status}
                  onChange={(e) =>
                    handleInputChange("status", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select status</option>
                  <option value="Allowed">Allowed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <ButtonSmallWhite
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                  onClick={closeModal}
                >
                  Discard
                </ButtonSmallWhite>
                {ecosystemType === "Gift" && (
                  <ButtonSmallPurple
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                    onClick={handleSubmit}
                  >
                    Update
                  </ButtonSmallPurple>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendeeManagement;
