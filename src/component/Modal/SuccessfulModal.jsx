import React from "react";
import { Modal } from "flowbite-react";
import { Heading, Text } from "../Text";
import { ButtonSmallPurple } from "../Buttons";

const SuccessModal = ({
  isOpen,
  onClose,
  message,
  buttonText,
  onButtonClick,
}) => {
  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      size="md"
      className="font-body backdrop-blur-md"
    >
      <Modal.Header className="relative p-4"></Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <Heading
            level={2}
            size="[20px]"
            weight="font-semibold"
            color="primary2"
          >
            {message}
          </Heading>
          <div className="my-4">
            <div className="w-16 h-16 mx-auto bg-primary7 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-primary1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <ButtonSmallPurple
            onClick={onButtonClick}
            className="mt-4 py-2 px-4 bg-primary3 text-primary1 rounded"
          >
            {buttonText}
          </ButtonSmallPurple>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
