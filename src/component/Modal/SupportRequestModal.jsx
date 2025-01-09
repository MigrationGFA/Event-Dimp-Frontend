import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import { LabelImportant } from "../Label";
import api from "../../api/DashboardApi";
import { showToast } from "../ShowToast";

// Validation schema using yup
const schema = yup.object().shape({
  supportReason: yup.string().required("Support reason is required."),
  message: yup.string().required("Message is required."),
});

const SupportRequestModal = ({
  isOpen,
  onClose,
  getSupportTable,
  getSupportBlock,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const creatorId = useSelector((state) => state.auth.user.creatorId);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.creatorSupportRequest({
        accessToken,
        refreshToken,
        creatorId,
        reason: data.supportReason,
        message: data.message,
        ecosystemDomain,
      });
      showToast(response.data.message, "success");
      getSupportBlock();
      getSupportTable();

      onClose();
    } catch (error) {
      console.error("Failed to process request:", error);
      setError("Failed to process support request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      className="font-body backdrop-blur-lg"
    >
      <Modal.Header>Support Request</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <LabelImportant
              htmlFor="support-reason"
              className="block text-sm font-medium text-ter13"
            >
              Support Reason
            </LabelImportant>
            <Controller
              name="supportReason"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select
                  id="support-reason"
                  {...field}
                  className={`mt-1 block w-full border border-sec2 rounded-md px-3 py-3 shadow-sm focus:ring-primary3 focus:border-primary3 ${
                    errors.supportReason ? "border-ter7" : ""
                  }`}
                >
                  <option value="">-- Select Option --</option>
                  <option value="Login Issue">Login Issue</option>
                  <option value="Payment Failure">Payment Failure</option>
                  <option value="Account Locked">Account Locked</option>
                  {/* Add more options as needed */}
                </select>
              )}
            />
            {errors.supportReason && (
              <span className="text-ter7 text-sm">
                {errors.supportReason.message}
              </span>
            )}
          </div>

          <div>
            <LabelImportant
              htmlFor="message"
              className="block text-sm font-medium text-ter13"
            >
              Message
            </LabelImportant>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  rows={6}
                  id="message"
                  placeholder="Typing..."
                  className={`w-full border rounded-md px-2 py-2 ${
                    errors.message ? "border-ter7" : ""
                  }`}
                  {...field}
                />
              )}
            />
            {errors.message && (
              <span className="text-ter7 text-sm">
                {errors.message.message}
              </span>
            )}
          </div>
          {error && <p className="text-ter7 text-sm">{error}</p>}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <ButtonSmallPurple
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </ButtonSmallPurple>
      </Modal.Footer>
    </Modal>
  );
};

export default SupportRequestModal;
